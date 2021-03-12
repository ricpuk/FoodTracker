import { UserManager, WebStorageStateStore } from "oidc-client";
import { AppPaths, AppName } from "./ApiAuthorizationConstants";

export class AuthorizationService {
  callbacks = [];
  nextSubscriptionId = 0;
  user = null;
  _isAuthenticated = false;

  // By default pop ups are disabled because they don't work properly on Edge.
  // If you want to enable pop up authentication simply set this flag to false.
  _popUpDisabled = false;

  async isAuthenticated() {
    const user = await this.getUser();
    return !!user;
  }

  async getUser() {
    if (this._user && this._user.profile) {
      return this._user.profile;
    }

    await this.ensureUserManagerInitialized();
    const user = await this.userManager.getUser();
    return user && user.profile;
  }

  async getAccessToken() {
    await this.ensureUserManagerInitialized();
    const user = await this.userManager.getUser();
    return user && user.access_token;
  }

  // We try to authenticate the user in three different ways:
  // 1) We try to see if we can authenticate the user silently. This happens
  //    when the user is already logged in on the IdP and is done using a hidden iframe
  //    on the client.
  // 2) We try to authenticate the user using a PopUp Window. This might fail if there is a
  //    Pop-Up blocker or the user has disabled PopUps.
  // 3) If the two methods above fail, we redirect the browser to the IdP to perform a traditional
  //    redirect flow.
  async signIn(state) {
    await this.ensureUserManagerInitialized();
    try {
      const silentUser = await this.userManager.signinSilent(
        this.createArguments()
      );
      this.updateState(silentUser);
      return this.success(state);
    } catch (silentError) {
      // User might not be authenticated, fallback to popup authentication
      console.log("Silent authentication error: ", silentError);

      try {
        await this.userManager.signinRedirect(this.createArguments(state));
        return this.redirect();
      } catch (redirectError) {
        console.log("Redirect authentication error: ", redirectError);
        return this.error(redirectError);
      }
    }
  }

  async completeSignIn(url) {
    try {
      await this.ensureUserManagerInitialized();
      const user = await this.userManager.signinCallback(url);
      this.updateState(user);
      return this.success(user && user.state);
    } catch (error) {
      console.log("There was an error signing in: ", error);
      return this.error("There was an error signing in.");
    }
  }

  // We try to sign out the user in two different ways:
  // 1) We try to do a sign-out using a PopUp Window. This might fail if there is a
  //    Pop-Up blocker or the user has disabled PopUps.
  // 2) If the method above fails, we redirect the browser to the IdP to perform a traditional
  //    post logout redirect flow.
  async signOut(state) {
    await this.ensureUserManagerInitialized();
    try {
      await this.userManager.signoutRedirect(this.createArguments(state));
      return this.redirect();
    } catch (redirectSignOutError) {
      console.log("Redirect signout error: ", redirectSignOutError);
      return this.error(redirectSignOutError);
    }
  }

  async completeSignOut(url) {
    await this.ensureUserManagerInitialized();
    try {
      const response = await this.userManager.signoutCallback(url);
      this.updateState(null);
      return this.success(response && response.data);
    } catch (error) {
      console.log(`There was an error trying to log out '${error}'.`);
      return this.error(error);
    }
  }

  updateState(user) {
    this.user = user;
    this._isAuthenticated = !!this.user;
    this.notifySubscribers();
  }

  subscribe(callback) {
    this.callbacks.push({
      callback,
      subscription: this.nextSubscriptionId++,
    });
    return this.nextSubscriptionId - 1;
  }

  unsubscribe(subscriptionId) {
    const subscriptionIndex = this.callbacks
      .map((element, index) =>
        element.subscription === subscriptionId
          ? { found: true, index }
          : { found: false }
      )
      .filter((element) => element.found === true);
    if (subscriptionIndex.length !== 1) {
      throw new Error(
        `Found an invalid number of subscriptions ${subscriptionIndex.length}`
      );
    }

    this.callbacks.splice(subscriptionIndex[0].index, 1);
  }

  notifySubscribers() {
    for (let i = 0; i < this.callbacks.length; i++) {
      const callback = this.callbacks[i].callback;
      callback();
    }
  }

  createArguments(state) {
    return { useReplaceToNavigate: true, data: state };
  }

  error(message) {
    return { status: AuthenticationResultStatus.Fail, message };
  }

  success(state) {
    return { status: AuthenticationResultStatus.Success, state };
  }

  redirect() {
    return { status: AuthenticationResultStatus.Redirect };
  }

  async ensureUserManagerInitialized() {
    if (this.userManager !== undefined) {
      return;
    }

    let response = await fetch(AppPaths.ApiAuthorizationClientConfigurationUrl);
    if (!response.ok) {
      throw new Error(`Could not load settings for '${AppName}'`);
    }

    let settings = await response.json();
    settings.automaticSilentRenew = true;
    settings.includeIdTokenInSilentRenew = true;
    settings.userStore = new WebStorageStateStore({
      prefix: AppName,
    });

    this.userManager = new UserManager(settings);

    this.userManager.events.addUserSignedOut(async () => {
      await this.userManager.removeUser();
      this.updateState(undefined);
    });
  }

  static get instance() {
    return authService;
  }
}

const authService = new AuthorizationService();

export default authService;

export const AuthenticationResultStatus = {
  Redirect: "redirect",
  Success: "success",
  Fail: "fail",
};
