import { google_instance } from './axios';

function getPhotos(placeId) {
  const params = {
    place_id: placeId,
    key: process.env.REACT_APP_API_KEY_GOOGLE,
    fields: 'photos'
  };
  return google_instance.get('/maps/api/place/details/json', { params });
}

export function getPhotoSourceFromReference(photoReference, width = 400) {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${width}&photoreference=${photoReference}&key=AIzaSyDAvfXiXVeMN803sCuPUexOzkVy-dgnqdE`;
}

export default getPhotos;