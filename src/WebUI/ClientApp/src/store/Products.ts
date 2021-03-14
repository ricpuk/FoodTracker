import { Action, Reducer } from "redux";
import API from "../utils/api";
import { AppThunkAction } from "./";

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ProductsState {
  isLoading: boolean;
  page?: number;
  products: Product[];
}

export interface Product {
  id: number;
}

const RESOURCE_URL = "api/products";

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestProductsQueryAction {
  type: "REQUEST_PRODUCTS_QUERY";
  page: number;
}

interface RequestProductsScanAction {
    type: "REQUEST_PRODUCTS_SCAN";
    page: number;
  }

interface ReceiveProductsAction {
  type: "RECEIVE_PRODUCTS";
  page: number;
  soundTracks: Product[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestProductsQueryAction | RequestProductsScanAction | ReceiveProductsAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
  requestProducts: (page: number): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    // Only load data if it's something we don't already have (and are not already loading)
    const appState = getState();
    if (
      appState &&
      appState.soundTracks &&
      page !== appState.soundTracks.page
    ) {
      API.get<Product>(RESOURCE_URL).then((response) => {
        const { data } = response;
        dispatch({
          type: "RECEIVE_PRODUCTS",
          page: page,
          soundTracks: data.items,
        });
      });
      dispatch({ type: "REQUEST_PRODUCTS", page: page });
    }
  },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: ProductsState = { products: [], isLoading: false };

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
        products: state.products,
        page: state.page,
        isLoading: true,
      };
    case "RECEIVE_PRODUCTS":
      if (action.page === state.page && ) {
        return {
          products: action.products,
          page: action.page,
          isLoading: false,
        };
      }
      break;
  }

  return state;
};
