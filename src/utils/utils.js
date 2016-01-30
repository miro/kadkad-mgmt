
export function getImageUrl(imageModel, size) {
  let baseUrl = DAKDAK.storageUrl + imageModel.storageId;

  switch (size) {
    case 'thumb':
      return baseUrl + '--thumb';
    case 'full':
      return baseUrl;
    default:
      return baseUrl + '--display';
  }
}
