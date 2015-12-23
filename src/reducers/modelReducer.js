import {List, Map} from 'immutable';


function setState(state, newState) {
  return state.merge(newState);
}


function createModel(state, modelType, newModel) {
  let currentList = state.get(modelType) || [];
  return state.set(modelType,List([
    ...currentList, Map(newModel)
  ]));
}

function updateModel(state, modelType, updatedModel) {
  let modelIndex = state.get(modelType).findIndex((item) => item.get('id') === updatedModel.id);

  let updatedList = state.get(modelType).update(modelIndex, oldModel => {
    return oldModel.merge(updatedModel);
  });

  return state.set(modelType, updatedList);
}



export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  case 'MODEL_CREATE':
    return createModel(state, action.modelType, action.model);
  case 'MODEL_UPDATE':
    return updateModel(state, action.modelType, action.model);
  default:
    return state;
  }
}
