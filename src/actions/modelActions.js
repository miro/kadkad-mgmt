import * as api from '../services/api';

export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}

export function getAllModels(modelType) {
  // NOTE: generate etag for server?
  return dispatch => {
    api.getModels(modelType)
    .then(models => {
      let updateObject = {};
      updateObject[modelType] = models;

      dispatch({
        type: 'SET_STATE',
        state: updateObject
      });
    })
    .catch(_errorHandler);
  }
}

export function createModel(modelType, props) {
  // TODO: filter unwanted modelTypes?
  return dispatch => {
    api.createModel(modelType, {...props})
    .then(model => dispatch({
      type: 'MODEL_CREATE',
      modelType,
      model
    }))
    .catch(_errorHandler);
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
    })
    .catch(_errorHandler);
  }
}

export function uploadImage(imageFile) {
  const uploadId = _generatePseudoId();

  return dispatch => {
    // create model to uploads collection
    dispatch({
      type: 'MODEL_CREATE',
      modelType: 'uploads',
      model: {
        id: uploadId,
        fileName: imageFile.name,
        size: imageFile.size / 1000, // convert to KBs
        status: 'in-progress',
        uploadPercent: 0
      }
    });

    let imageMetaData = {};

    const onProgressEvent = event => {
      const uploadPercent = parseInt(event.percent, 10) + '%';

      dispatch({
        type: 'MODEL_UPDATE',
        modelType: 'uploads',
        model: {
          id: uploadId,
          uploadPercent
        }
      });
    };

    // if image has last modified -information, parse it to Image model
    if (imageFile.lastModified) {
      let lastModified = new Date(imageFile.lastModified);
      imageMetaData.year = lastModified.getFullYear();
      imageMetaData.month = lastModified.getMonth() + 1;
    }

    // init the actual upload
    api.uploadImage(imageFile, imageMetaData, onProgressEvent)
    .then(imageModel => {

      // create the actual image model
      dispatch({
        type: 'MODEL_CREATE',
        modelType: 'images',
        model: imageModel
      });

      // "finish" the update model
      dispatch({
        type: 'MODEL_UPDATE',
        modelType: 'uploads',
        model: { id: uploadId, status: 'ready' }
      });
    })
    .catch(error => {
      console.error('Error on image upload', error);

      dispatch({
        type: 'MODEL_UPDATE',
        modelType: 'uploads',
        model: { id: uploadId, status: 'failed' }
      });
    });
  }
}


function _errorHandler(error) {
  console.error('Error catched on modelActions', error);
}

const _generatePseudoId = (function() {
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
