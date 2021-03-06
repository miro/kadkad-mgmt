import history from '../history';

import * as tokenService from '../services/token';
import * as api from '../services/api';

const URL_TO_REDIRECT_ON_401 = '/kirjaudu';

export function changeTab(viewName, targetTabName) {
  return {
    type: 'TAB_CHANGE',
    viewName,
    targetTabName
  };
}

export function userLogin(token) {
  tokenService.setToken(token);
  window.scroll(0, 0);
  const userInfo = tokenService.getUserProfile();

  return {
    type: 'USER_UPDATE',
    ...userInfo
  };
}

export function userLogout() {
  // this is called also when unauthorized request is catched
  tokenService.removeToken();
  history.replaceState(null, URL_TO_REDIRECT_ON_401);

  return {
    type: 'USER_UPDATE',
    profile: {},
    loggedIn: false
  };
}

export function turnPage(viewName, turnForward, totalItemCount) {
  return {
    type: 'PAGE_TURN',
    viewName,
    turnForward,
    totalItemCount
  };
}

export function resetPage(viewName) {
  return {
    type: 'PAGE_RESET',
    viewName
  };
}

export const INVITATION_ERROR_MESSAGE = 'INVITATION_ERROR_MESSAGE';
export const INVITATION_REDEEMED_FLAG = 'INVITATION_REDEEMED_FLAG';
export const INVITATION_NO_MORE_TRIES_LEFT_FLAG = 'INVITATION_NO_MORE_TRIES_LEFT_FLAG';
export function challengeInvitationCode(invitationCode) {
  return dispatch => {
    api.sendInvitationCode(invitationCode)
        .then(response => {
          // unset error message, in case there is one
          dispatch(setData(INVITATION_ERROR_MESSAGE, null));

          // update user token
          dispatch(userLogin(response.newToken));

          // set flag that invitation went through
          dispatch(setFlag(INVITATION_REDEEMED_FLAG));
        })
        .catch(error => {
          switch (error.status) {
            case 400:
              dispatch(setData(INVITATION_ERROR_MESSAGE, 'Koodi on väärä'));
              break;

            case 403:
              dispatch(setFlag(INVITATION_NO_MORE_TRIES_LEFT_FLAG));
              dispatch(setData(INVITATION_ERROR_MESSAGE, 'Maksimimäärä yrityksiä täynnä - et voi yrittää enää'));
              break;

            case 410:
              dispatch(setData(INVITATION_ERROR_MESSAGE, 'Olet käyttänyt jo yhden koodin'));
              break;
          }
        });
  }
}

export function setData(key, value) {
  return {
    type: 'SET_DATA',
    key,
    value
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


// # These requires no authentication
//
export function fetchKpi() {
  return dispatch => {
    api.getKpi()
      .then(kpi => dispatch(setData('kpi', kpi)));
  };
}

export function fetchLatestImages() {
  return dispatch => {
    api.getLatestImages()
      .then(latest => dispatch(setData('latestImages', latest)));
  }
}

export const SPOT_LOCATIONS = 'SPOT_LOCATIONS';
export function fetchSpotLocations() {
  return dispatch => {
    api.getSpotLocations()
      .then(locations => dispatch(setData(SPOT_LOCATIONS, locations)));
  };
}

