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

export const UPLOAD_STATUS = {
  IN_PROGRESS: 'in-progress',
  PROCESSING: 'processing', // uploaded to server, now processing
  READY: 'ready',
  FAILED: 'failed'
};
export function uploadImage(imageFile) {
  const uploadId = _generatePseudoId();
  // possible values for upload statuses


  return dispatch => {
    // create model to uploads collection
    dispatch({
      type: 'MODEL_CREATE',
      modelType: 'uploads',
      model: {
        id: uploadId,
        fileName: imageFile.name,
        size: parseInt(imageFile.size / 1000, 10), // convert to KBs
        status: UPLOAD_STATUS.IN_PROGRESS,
        uploadPercent: 0
      }
    });

    let imageMetaData = {};

    const onProgressEvent = event => {
      const uploadPercent = parseInt(event.percent, 10) + '%';
      const uploadReady = (uploadPercent === '100%');

      dispatch({
        type: 'MODEL_UPDATE',
        modelType: 'uploads',
        model: {
          id: uploadId,
          uploadPercent,
          status: uploadReady ? UPLOAD_STATUS.PROCESSING : UPLOAD_STATUS.IN_PROGRESS
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
        model: { id: uploadId, status: UPLOAD_STATUS.READY }
      });
    })
    .catch(error => {
      console.error('Error on image upload', error);

      dispatch({
        type: 'MODEL_UPDATE',
        modelType: 'uploads',
        model: { id: uploadId, status: UPLOAD_STATUS.FAILED }
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
