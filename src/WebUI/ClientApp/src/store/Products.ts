import { AxiosRequestConfig } from "axios";
import { Action, Reducer } from "redux";
import API from "../utils/api";
import { GetListResponse } from "../utils/interfaces";
import { AppThunkAction } from "./";

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ProductsState {
  isLoading: boolean;
  page?: number;
  products: Product[];
  query: string;
  code: string;
}

export interface Product {
  barCode: string;
  id: number;
  complete: boolean;
  name: string;
  servings: ProductServing[];
}

export interface ProductServing {
  id: number;
  productId: number;
  servingSize: number;
  servingSizeUnit: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fats: number;
  fiber: number;
  sodium: number;
}

const RESOURCE_URL = "api/products";

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestProductsQueryAction {
  type: "REQUEST_PRODUCTS";
  query: string;
  page: number;
}

interface ScanProductQueryAction {
  type: "SCAN_PRODUCT";
  code: string;
}

interface ReceiveProductsAction {
  type: "RECEIVE_PRODUCTS";
  page: number;
  query: string;
  products: Product[];
}

interface ReceiveScannedProductAction {
  type: "RECEIVE_SCANNED_PRODUCT";
  product: Product;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction =
  | RequestProductsQueryAction
  | ReceiveProductsAction
  | ScanProductQueryAction
  | ReceiveScannedProductAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
  requestProductsByQuery: (
    query: string,
    page: number
  ): AppThunkAction<KnownAction> => (dispatch, getState) => {
    // Only load data if it's something we don't already have (and are not already loading)
    const appState = getState();
    if (appState && appState.products && query !== appState.products.query) {
      const config: AxiosRequestConfig = {
        params: {
          query: query,
          page: page,
        },
      };
      API.get<GetListResponse<Product>>(RESOURCE_URL, config).then(
        (response) => {
          const { data } = response;
          dispatch({
            type: "RECEIVE_PRODUCTS",
            page: page,
            query: query,
            products: data.items,
          });
        }
      );
      dispatch({ type: "REQUEST_PRODUCTS", page: page, query: query });
    }
  },
  requestProductByCode: (code: string): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    // Only load data if it's something we don't already have (and are not already loading)
    const appState = getState();
    if (appState && appState.products) {
      API.get<Product>(`${RESOURCE_URL}/${code}`).then((response) => {
        const { data } = response;
        dispatch({
          type: "RECEIVE_SCANNED_PRODUCT",
          product: data,
        });
      });
      dispatch({ type: "SCAN_PRODUCT", code: code });
    }
  },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: ProductsState = {
  products: [],
  isLoading: false,
  query: "",
  code: "",
};

export const reducer: Reducer<ProductsState> = (
  state: ProductsState | undefined,
  incomingAction: Action
): ProductsState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "REQUEST_PRODUCTS":
      return {
        ...state,
        products: state.products,
        page: action.page,
        query: action.query,
        isLoading: true,
      };
    case "RECEIVE_PRODUCTS":
      if (action.page === state.page && action.query === state.query) {
        return {
          ...state,
          products: action.products,
          page: action.page,
          query: action.query,
          isLoading: false,
        };
      }
      break;
    case "SCAN_PRODUCT":
      return {
        ...state,
        code: action.code,
        isLoading: true,
      };
  }

  return state;
};
