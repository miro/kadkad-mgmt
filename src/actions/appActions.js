export function turnPage(viewName, turnForward, totalItemCount) {
  return {
    type: 'TURN_PAGE',
    viewName,
    turnForward,
    totalItemCount
  };
}
