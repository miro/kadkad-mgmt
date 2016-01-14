import * as tokenService from '../services/token';

export function changeTab(viewName, targetTabName) {
  return {
    type: 'TAB_CHANGE',
    viewName,
    targetTabName
  };
}


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

export function setMessage(messageName, message) {
  return {
    type: 'SET_MESSAGE',
    messageName,
    message
  };
}

export function setFlag(flagName) {
  return {
    type: 'FLAG_SET',
    flagName
  };
}
export function unsetFlag(flagName) {
  return {
    type: 'FLAG_UNSET',
    flagName
  };
}
export function deleteFlag(flagName) {
  return {
    type: 'FLAG_DELETE',
    flagName
  };
}
