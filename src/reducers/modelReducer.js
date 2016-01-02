import {List, Map} from 'immutable';


function setState(state, newState) {
  return state.merge(newState);
}

function createModel(state, modelType, newModel) {
  let currentList = state.get(modelType) || [];

  return state.set(modelType, List([
    ...currentList, Map(newModel)
  ]));
}

// TODO: use .find() instead of .findIndex()
function updateModel(state, modelType, updatedModel) {
  let modelIndex = state.get(modelType).findIndex((item) => item.get('id') === updatedModel.id);

  let updatedList = state.get(modelType).update(modelIndex, oldModel => {
    return oldModel.merge(updatedModel);
  });

  return state.set(modelType, updatedList);
}

function deleteModel(state, modelType, model) {
  const originalList = state.get(modelType);
  const modelIndex = originalList.findIndex((item) => item.get('id') === model.id);

  if (modelIndex < 0) {
    // no model was found, return the state as it is
    return state;
  }
  else {
    return state.set(modelType, originalList.delete(modelIndex));
  }
}



export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  case 'MODEL_CREATE':
    return createModel(state, action.modelType, action.model);
  case 'MODEL_UPDATE':
    return updateModel(state, action.modelType, action.model);
  case 'MODEL_DELETE':
    return deleteModel(state, action.modelType, action.model);
  default:
    return state;
  }
}
