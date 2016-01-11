// This file describes what kind of models we have in this app.
// TODO: how this should be named? Now the name might be a bit misleading

// Model types
export const types = {
  PERSONS:        'persons',
  SPOTS:          'spots',
  IMAGES:         'images',
  UPLOADS:        'uploads'
};

// Map model types into displayaple formats
export const toDisplayFormat = function(modelType, singularForm) {
  switch(modelType) {
    case types.PERSONS:
      return (singularForm) ? 'Henkilö' : 'Henkilöt';
    case types.SPOTS:
      return (singularForm) ? 'Spotti' : 'Spotit';
    case types.IMAGES:
      return (singularForm) ? 'Kuva' : 'Kuvat';
    case types.UPLOADS:
      return (singularForm) ? 'Uploadi' : 'Uploadit';
    default:
      console.error('Unknown model type', modelType);
      return null;
  }
};
