import * as tokenService from '../services/token';


export function userLogin(token) {
  tokenService.setToken(token);
  const userInfo = tokenService.getUserProfile();

  return {
    type: 'USER_UPDATE',
    ...userInfo
  };
}

export function userLogout() {
  tokenService.removeToken();
  return {
    type: 'USER_UPDATE',
    profile: {},
    loggedIn: false
  };
}

export function turnPage(viewName, turnForward, totalItemCount) {
  return {
    type: 'TURN_PAGE',
    viewName,
    turnForward,
    totalItemCount
  };
}
