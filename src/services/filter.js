// # filterService
//      filters stuff on the UI based on user input
//
import _ from 'lodash';

export function imageFilter(images, opts) {
  console.log('filtering', opts);

  // Parse opts
  const textFilter = opts.textFilter ? opts.textFilter.toLowerCase() : false;
  const showOnlyIncomplete = opts.showOnlyIncomplete;

  if (textFilter) {
    images = _.filter(images, image => {
      return matchFound(image, 'title', textFilter) ||
        matchFound(image, 'trickName', textFilter);
    });
  }

  if (showOnlyIncomplete) {
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
