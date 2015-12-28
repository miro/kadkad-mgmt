import * as api from '../apiService.js';


// # "API"
//

export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}

export function createModel(modelType) {
  // TODO: filter unwanted modelTypes?
  // TODO: default values by modelType
  return dispatch => {
    api.createModel(modelType, {
      fullName: 'Koko Nimi',
      displayName: 'Näyttönimi'
    })
    .then(model => dispatch({
      type: 'MODEL_CREATE',
      modelType,
      model
    }));
  }
}

export function updateModel(id, modelType, props) {
  return dispatch => {
    api.updateModel(modelType, id, props)
    .then(model => {
      dispatch({
        type: 'MODEL_UPDATE',
        modelType,
        model: {
          id,
          ...props
        }
      });
    });
  }
}


export function uploadImage(imageFile) {
  return dispatch => {
    api.uploadImage(imageFile)
    .then(imageModel => {
      dispatch({
        type: 'MODEL_CREATE',
        modelType: 'images',
        model: imageModel
      });
    });
  }
}

