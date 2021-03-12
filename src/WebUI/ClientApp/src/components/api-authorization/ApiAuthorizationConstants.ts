export const AppName = 'FoodTracker.WebUI';

export const QueryParams = {
  ReturnUrl: 'returnUrl',
  Message: 'message'
};

export const LogoutPaths = {
  LogoutCallback: 'logout-callback',
  Logout: 'logout',
  LoggedOut: 'logged-out'
};

export const LoginPaths = {
  Login: 'login',
  LoginCallback: 'login-callback',
  LoginFailed: 'login-failed',
  Profile: 'profile',
  Register: 'register'
};

const prefix = '/authentication';

export const AppPaths = {
  DefaultLoginRedirectPath: '/',
  ApiAuthorizationClientConfigurationUrl: `_configuration/${AppName}`,
  ApiAuthorizationPrefix: prefix,
  Login: `${prefix}/${LoginPaths.Login}`,
  LoginFailed: `${prefix}/${LoginPaths.LoginFailed}`,
  LoginCallback: `${prefix}/${LoginPaths.LoginCallback}`,
  Register: `${prefix}/${LoginPaths.Register}`,
  Profile: `${prefix}/${LoginPaths.Profile}`,
  LogOut: `${prefix}/${LogoutPaths.Logout}`,
  LoggedOut: `${prefix}/${LogoutPaths.LoggedOut}`,
  LogOutCallback: `${prefix}/${LogoutPaths.LogoutCallback}`,
  IdentityRegisterPath: 'Identity/Account/Register',
  IdentityManagePath: 'Identity/Account/Manage'
};
