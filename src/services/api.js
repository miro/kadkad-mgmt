import request from 'superagent';
import Promise from 'bluebird';

import {getToken} from './token';
import {userLogout} from '../actions/appActions';

const baseUrl = DAKDAK.apiBaseUrl;

var storeHandle = null; // handle to redux store

// # Utils ----------------------------------------------------
//
// Hack: create general handler for unauthorized responses
// (from https://github.com/visionmedia/superagent/issues/165#issuecomment-166383362)
//
// if unauthorized request is catched, forward user to /login
const end = request.Request.prototype.end;
request.Request.prototype.end = function (callback) {
  return end.call(this, (error, response) => {
    if (response && response.unauthorized) {
      console.error('Unauthorized request!');
      storeHandle.dispatch(userLogout());
      callback(error, response);
    } else {
      callback(error, response);
    }
  });
};

// middleware for setting authorization header
function authorizationHeader(request) {
  let token = getToken();
  if (token) {
    request.set('Authorization', 'Bearer ' + token);
  }
}



// # API ----------------------------------------------------
//

export function setStore(store) {
  storeHandle = store;
}

export function getModels(modelType) {
  return new Promise((resolve, reject) => {
    request.get(baseUrl + modelType)
      .use(authorizationHeader)
      .end((error, response) => (error) ? reject(error) : resolve(response.body));
  });
}

export function createModel(modelType, model) {
  return new Promise((resolve, reject) => {
    request.post(baseUrl + modelType)
      .use(authorizationHeader)
      .send(model)
      .end((error, response) => (error) ? reject(error) : resolve(response.body));
  });
}

export function updateModel(modelType, modelId, model) {
  return new Promise((resolve, reject) => {
    request.put(baseUrl + modelType + '/' + modelId)
      .use(authorizationHeader)
      .send(model)
      .end((error, response) => (error) ? reject(error) : resolve(response.body));
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
      .end((error, response) => (error) ? reject(error) : resolve(response.body));
  });
}

export function sendInvitationCode(invitationCode) {
  return new Promise((resolve, reject) => {
    request.post(baseUrl + 'invitation')
    .use(authorizationHeader)
    .send({ invitationCode: invitationCode })
    .end((error, response) => (error) ? reject(error) : resolve(response.body));
  });
}

export function getKpi() {
  return new Promise((resolve, reject) => {
    request.get(baseUrl + 'kpi')
      .end((error, response) => (error) ? reject(error) : resolve(response.body));
  });
}

export function getLatestImages() {
  return new Promise((resolve, reject) => {
    request.get(baseUrl + 'images/latest')
      .end((error, response) => (error) ? reject(error) : resolve(response.body));
  });
}

export function getSpotLocations() {
  return new Promise((resolve, reject) => {
    request.get(baseUrl + 'spots/locations')
      .end((error, response) => (error) ? reject(error) : resolve(response.body));
  });
}
