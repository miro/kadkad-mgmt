import * as tokenService from '../services/token';


export function userLogin(token) {
  tokenService.setToken(token);
  const profile = tokenService.getUserProfile();
  console.log(profile);

  return {
    type: 'USER_UPDATE',
    profile,
    loggedIn: true
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
