import moment from 'moment';

import * as api from '../apiService.js';


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
  const uploadId = _generatePseudoId();

  const handleUploadProgress = event => {
    console.log(event);
  };

  return dispatch => {
    // create model to uploads collection
    dispatch({
      type: 'MODEL_CREATE',
      modelType: 'uploads',
      model: {
        id: uploadId,
        fileName: imageFile.name,
        size: imageFile.size / 1000, // convert to KBs
        status: 'in-progress'
      }
    });

    let imageMetaData = {};

    // if image has last modified -information, parse it to Image model
    if (imageFile.lastModified) {
      let lastModified = moment(imageFile.lastModified);
      imageMetaData.year = lastModified.format('YYYY');
      imageMetaData.month = lastModified.format('M');
    }

    // init the actual upload
    api.uploadImage(imageFile, imageMetaData, handleUploadProgress)
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
      console.log('error on upload', error);

      dispatch({
        type: 'MODEL_UPDATE',
        modelType: 'uploads',
        model: { id: uploadId, status: 'failed' }
      });
    });
  }
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
