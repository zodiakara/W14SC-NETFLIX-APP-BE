import { getMedia, writeMedia } from "../fs-tools.js/fs-tools.js";
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
  const newMedia = {
    ...newMediaData,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: uniqid(),
    comments: [],
  };
  medias.push(newMedia);
  await writeMedia(newMedia);

  return newMedia.id;
};

export const findMedia = async () => {};
export const findMediaById = async () => {};
export const findMediaByIdAndUpdate = async () => {};
export const findMediaByIdAndDelete = async () => {};
