export function setState(state) {
  // TODO: general action creator for set state etc?
  return {
    type: 'SET_STATE',
    state
  };
}

export function turnPage(viewName, turnForward, totalItemCount) {
  console.log(totalItemCount);
  return {
    type: 'TURN_PAGE',
    viewName,
    turnForward,
    totalItemCount
  };
}
