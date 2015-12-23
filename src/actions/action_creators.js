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
  return {
    type: 'MODEL_CREATE',
    modelType, // TODO: enum or something?
    model: {
      id: _generateId(), // this will be replaced by the backend
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



// # Utility functions
//

const _generateId = (function() {
    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
       .toString(16)
       .substring(1);
    }
    return function() {
        return s4() + s4() + s4() + s4();
    };
})();
