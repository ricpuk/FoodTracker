import * as Diaries from "./Diaries";
import * as Products from "./Products";
import * as Application from "./ApplicationParams";
import { User } from "oidc-client";
import { reducer as oidcReducer } from "redux-oidc";

interface OidcState {
  isLoadingUser: boolean;
  user: User;
}

// The top-level state object
export interface ApplicationState {
  diaries: Diaries.DiariesState | undefined;
  products: Products.ProductsState | undefined;
  application: Application.ApplicationParamsState | undefined;
  oidc: OidcState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
  diaries: Diaries.reducer,
  products: Products.reducer,
  application: Application.reducer,
  oidc: oidcReducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
