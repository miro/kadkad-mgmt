import request from 'superagent';
import Promise from 'bluebird';

const baseUrl = 'http://localhost:5000/api/v0/'; // TODO: from cfg-file

// TODO: handleresult-util-function(???)



export function getModels(modelType) {
  return new Promise((resolve, reject) => {
    request.get(baseUrl + modelType)
      .end((error, response) => {
        if (error) {
          reject(error)
        } else {
          resolve(response.body);
        }
      })
  });
}


export function createModel(modelType, model) {
  return new Promise((resolve, reject) => {
    request.post(baseUrl + modelType)
      .send(model)
      .end((error, response) => {
        (error) ? reject(error) : resolve(response.body);
      }
    )
  });
}


export function updateModel(modelType, modelId, model) {
  return new Promise((resolve, reject) => {
    request.put(baseUrl + modelType + '/' + modelId)
      .send(model)
      .end((error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response.body);
        }
      }
    )
  });
}


export function uploadImage(imageFile, metaData, handleProgressEvent) {
  return new Promise((resolve, reject) => {

    let formData = new FormData();
    formData.append('imageFile', imageFile);

    for (var prop in metaData) {
      formData.append(prop, metaData[prop]);
    }

    // HOX: superagent has currently issue with multipart form data,
    // read more from https://github.com/visionmedia/superagent/issues/746
    request.post(baseUrl + 'images')
      .send(formData)
      .on('progress', function(e) {
        (handleProgressEvent) ? handleProgressEvent(e) : 'do nothing';
      })
      .end((error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response.body);
        }
      });
  });
}


