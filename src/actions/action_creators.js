import * as apiService from '../apiService.js';

export function createModel(modelType) {
  // TODO: filter unwanted modelTypes?
  return {
    type: 'MODEL_CREATE',
    modelType, // TODO: enum or something?
    model: {
      id: dummyIdGenerator(),
      fullName: 'Koko Nimi',
      displayName: 'Näyttönimi',
      meta: { editMode: false }
    }
  }
}

export function updateModel(id, modelType, props) {
  return {
    type: 'MODEL_UPDATE',
    modelType,
    model: {
      id,
      ...props
    }
  }
}

export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}

export function uploadImage(imageFile) {
  return dispatch => {
    apiService.uploadImage(imageFile)
    .then(imageModel => {
      dispatch({
        type: 'MODEL_CREATE',
        modelType: 'images',
        model: imageModel
      });
    });
  }
}

function dummyIdGenerator() {
  // Temp hack until we hook up a actual API into this.
  return parseInt(Math.random() * 1000000, 10);
}
