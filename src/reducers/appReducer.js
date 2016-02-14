import {List, Map, fromJS} from 'immutable';

export const defaultState = {
  // everything related to the app/system itself
  appState: {
    kpi: {
      pixelCount: '???',
      imageCount: '???',
    },

    imageEditView: {}
  },

  flags: {},

  user: { // info of current logged in user
    loggedIn: false,
    profile: {}
  },

  tabs: {
    spotsAndPersonsEditView: {
      currentTab: 'spots',
      tabs: ['persons', 'spots']
    }
  },
  paging: { // state for the current page setup
    imageEditView: {
      itemsInPage: 10,
      currentPage: 0
    }
  }
}

function setState(state, newState) {
  return state.merge(newState);
}

// # Tabs related ----------------------------------------------
function setTab(state, viewName, targetTabName) {
  const tabState = state.getIn(['tabs', viewName]);

  if (!tabState) {
    console.error('No tab state saved for', viewName);
    return state;
  }

  if (!tabState.get('tabs').includes(targetTabName)) {
    console.error('Unknown tab "', targetTabName, '" requested from', viewName);
    return state;
  }

  // otherwise -> update tab
  return state.setIn(['tabs', viewName, 'currentTab'], targetTabName);
}

// # Current user account related ------------------------------
//

function updateUser(state, profile, loggedIn) {
  // This assumes that this user objet is OK & authenticated
  return state.set('user', fromJS({ loggedIn, profile }));
}


// # Messages and flasgs related - error responses etc --------------------
//    - messages: basically key-value store
//    - flags: same as messages, but only key-boolean -store
function setData(state, key, value) {
  const path = ['appState'].concat(key);
  return state.setIn(path, value);
}

function setFlag(state, flagName) {
  // turn flag to true
  return state.setIn(['flags', flagName], true);
}
function unsetFlag(state, flagName) {
  // turn flag to false
  return state.setIn(['flags', flagName], false);
}
function deleteFlag(state, flagName) {
  // deletes flag completely
  return state.deleteIn(['flags', flagName]);
}


// # View paging related----------------------------------------
//
function turnPage(state, viewName, turnForward, totalItemCount) {
  const pageState = state.getIn(['paging', viewName]);

  let newPageNumber = (turnForward) ?
    pageState.get('currentPage') + 1 :
    pageState.get('currentPage') - 1;

  // check that page doesn't underflow (is that a term?)
  newPageNumber = (newPageNumber < 0) ? 0 : newPageNumber;

  // check that page doesn't overflow
  let lastIndexOnNewPage = newPageNumber * pageState.get('itemsInPage') + pageState.get('itemsInPage');
  let firstIndexOnNewPage = newPageNumber * pageState.get('itemsInPage');

  if (lastIndexOnNewPage <= totalItemCount ||
    (firstIndexOnNewPage <= totalItemCount && totalItemCount <= lastIndexOnNewPage)) {
    return state.setIn(['paging', viewName, 'currentPage'], newPageNumber);
  }
  else {
    return state;
  }
}

function resetPage(state, viewName) {
  const newPageNumber = 0;
  return state.setIn(['paging', viewName, 'currentPage'], newPageNumber);
}



export default function(state = Map(), action) {
  // TODO get action types from some const cfg object
  // TODO tests for message and flag related operations
  switch (action.type) {
  case 'TAB_CHANGE':
    return setTab(state, action.viewName, action.targetTabName);

  case 'SET_STATE':
    return setState(state, action.state);

  case 'SET_DATA':
    return setData(state, action.key, action.value);
  case 'FLAG_SET':
    return setFlag(state, action.flagName);
  case 'FLAG_UNSET':
    return unsetFlag(state, action.flagName);
  case 'FLAG_DELETE':
    return deleteFlag(state, action.flagName);

  case 'USER_UPDATE':
    return updateUser(state, action.profile, action.loggedIn);

  case 'PAGE_TURN':
    return turnPage(state, action.viewName, action.turnForward, action.totalItemCount);
  case 'PAGE_RESET':
    return resetPage(state, action.viewName);


  default:
    return state;
  }
}
