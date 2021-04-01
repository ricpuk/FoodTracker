import * as Diaries from "./Diaries";
import * as Products from "./Products";
import * as Application from "./ApplicationParams";
import * as LocalUser from "./User";
import * as Coaching from "./Coaching";
import { reducer as toastrReducer } from "react-redux-toastr";
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
  user: LocalUser.UserState | undefined;
  application: Application.ApplicationParamsState | undefined;
  coaching: Coaching.CoachingState | undefined;
  oidc: OidcState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
  diaries: Diaries.reducer,
  products: Products.reducer,
  user: LocalUser.reducer,
  application: Application.reducer,
  coaching: Coaching.reducer,
  toastr: toastrReducer,
  oidc: oidcReducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
