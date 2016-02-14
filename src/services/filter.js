// # filterService
//      filters stuff on the UI based on user input
//
import _ from 'lodash';

export function imageFilter(images, opts) {
  console.log('filtering', opts);

  // Parse opts
  const filterString = opts.filterString ? opts.filterString.toLowerCase() : false;
  const showOnlyUncompleteImages = opts.showOnlyUncomplete;

  if (filterString) {
    images = _.filter(images, image => {
      return matchFound(image, 'title', filterString) ||
        matchFound(image, 'trickName', filterString);
    });
  }

  if (showOnlyUncompleteImages) {
    images = _.filter(images, image => {
      return keyIsNotSet(image, 'spotId') ||
        keyIsNotSet(image, 'riderId');
    })
  }

  return images;
}


function matchFound(model, fieldName, searchString) {
  const fieldValue = model.get(fieldName);

  if (fieldValue) {
    return fieldValue.toLowerCase().indexOf(searchString) >= 0;
  } else {
    return false;
  }
}

function keyIsNotSet(model, fieldName) {
  return !model.get(fieldName);
}
