import {List, Map, fromJS} from 'immutable';

export const defaultState = {
  user: { // info of current logged in user
    loggedIn: false,
    profile: {}
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

// # Current user account related ------------------------------
//

function updateUser(state, profile, loggedIn) {
  // This assumes that this user objet is OK & authenticated
  return state.set('user', fromJS({ loggedIn, profile }));
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

export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  case 'USER_UPDATE':
    return updateUser(state, action.profile, action.loggedIn);
  case 'TURN_PAGE':
    return turnPage(state, action.viewName, action.turnForward, action.totalItemCount);
  default:
    return state;
  }
}
