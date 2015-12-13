import request from 'superagent';
import Promise from 'bluebird';

const baseUrl = 'http://localhost:5000/api/v0/';


export function uploadImage(imageFile) {
  return new Promise((resolve, reject) => {

    let formData = new FormData();
    formData.append('imageFile', imageFile);

    // HOX: superagent has currently issue with multipart form data,
    // read more fromhttps://github.com/visionmedia/superagent/issues/746
    request.post(baseUrl + 'image')
      .send(formData)
      .on('progress', function(e) {
        console.log('Percentage done: ', e.percent);
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

export function getModels(modelType) {
  return new Promise((resolve, reject) => {
    request
      .get(baseUrl + modelType)
      .end((error, response) => {
        if (error) {
          reject(error)
        } else {
          resolve(response.body);
        }
      })
  });
}
