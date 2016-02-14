// # filterService
//      filters stuff on the UI based on user input
//

import _ from 'lodash';

export function imageFilter(images, filterString) {
  if (!filterString) {
    return images;
  }

  filterString = filterString.toLowerCase();

  return _.filter(images, image => {
    return matchFound(image, 'title', filterString) ||
      matchFound(image, 'trickName', filterString);
  });
}

function matchFound(model, fieldName, searchString) {
  const fieldValue = model.get(fieldName);

  if (fieldValue) {
    return fieldValue.toLowerCase().indexOf(searchString) >= 0;
  } else {
    return false;
  }
}
