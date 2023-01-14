import { getMedia, writeMedia } from "../lib/fs-tools.js";
import uniqid from "uniqid";

// /medias
// POST Media
// GET Media (list)
// /medias/:id
// GET Media (single)
// /medias/:id/poster
// POST Upload poster to single media
// medias/:id/pdf
//  Export single media data as PDF

export const saveNewMedia = async (newMediaData) => {
  const medias = await getMedia();
  console.log(medias);
  const newMedia = {
    ...newMediaData,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: uniqid(),
    comments: [],
  };
  medias.push(newMedia);
  await writeMedia(medias);
  return newMedia.id;
};

export const findMedia = async () => getMedia();

export const findMediaById = async (id) => {
  const medias = await getMedia();
  const media = medias.find((media) => media.id === id);

  return media;
};

export const findMediaByIdAndUpdate = async (id, update) => {
  const medias = await getMedia();
  const i = medias.findIndex((media) => media.id === id);

  if (i !== -1) {
    medias[i] = {
      ...medias[i],
      ...update,
      updatedAt: new Date(),
    };

    await writeMedia(medias);
    return medias[i];
  } else {
    return null;
  }
};

export const findMediaByIdAndDelete = async (id) => {
  const medias = await getMedia();
  const media = await findMediaById(id);
  if (media) {
    const remainingMedias = medias.filter((media) => media.id !== id);
    await writeMedia(remainingMedias);
    return media;
  } else {
    return null;
  }
};
