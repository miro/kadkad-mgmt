import request from 'superagent';


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

    let formData = new FormData();
    formData.append('imageFile', imageFile);

    // HOX: superagent has currently issue with multipart form data,
    // read more fromhttps://github.com/visionmedia/superagent/issues/746
    request.post('http://localhost:5000/api/v0/image')
      .send(formData)
      .end();

    dispatch({
      type: 'IMAGE_UPLOAD',
      imageFile
    });
  }
}

function dummyIdGenerator() {
  // Temp hack until we hook up a actual API into this.
  return parseInt(Math.random() * 1000000, 10);
}
