import {
  saveImage
} from '@service/api/common';


export const uploadImage = (payload) => async () => {
  const res = await saveImage(payload);
  return res;
};
