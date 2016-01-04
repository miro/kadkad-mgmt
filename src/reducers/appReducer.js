import {List, Map} from 'immutable';

export const defaultState = {
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

function turnPage(state, viewName, turnForward, totalItemCount) {
  console.log(viewName, turnForward, totalItemCount);
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
  case 'TURN_PAGE':
    return turnPage(state, action.viewName, action.turnForward, action.totalItemCount);
  default:
    return state;
  }
}
