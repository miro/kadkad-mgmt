import request from 'superagent';
import Promise from 'bluebird';

import {getToken} from './auth';

const baseUrl = 'http://localhost:5000/api/v0/'; // TODO: from cfg-file



// Hack: create general handler for unauthorized responses
// (from https://github.com/visionmedia/superagent/issues/165#issuecomment-166383362)
const end = request.Request.prototype.end;
request.Request.prototype.end = function (callback) {
  return end.call(this, (error, response) => {
    if (response.unauthorized) {
      console.log('UNAUTHZzzd');
      // history.pushState(null, '/login');
    } else {
      callback(error, response);
    }
  });
};

// sets the authorization header
function authorizationHeader(request) {
  let token = getToken();
  console.log(token, 'jodasjfioads');
  if (token) {
    request.set('Authorization', 'Bearer ' + token);
  }
}



export function getModels(modelType) {
  return new Promise((resolve, reject) => {
    request.get(baseUrl + modelType)
      .use(authorizationHeader)
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
      .use(authorizationHeader)
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
      .use(authorizationHeader)
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
      .use(authorizationHeader)
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


