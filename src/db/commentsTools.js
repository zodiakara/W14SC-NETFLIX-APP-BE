import { getMedia, writeMedia } from "../lib/fs-tools.js";
import uniqid from "uniqid";

export const saveNewComment = async (id, newCommentData) => {
  // push the new comment into existing media array into the current one (by ID)
  const medias = await getMedia();
  const index = medias.findIndex((media) => media.id === id);

  if (index !== -1) {
    medias[index].comments.push({
      ...newCommentData,
      id: uniqid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await writeMedia(medias);
    return medias[index];
  } else {
    return null; // if there is no matching media to add a comment to -> return null
  }
};

export const findComments = async (id) => {
  const medias = await getMedia();
  const index = medias.findIndex((media) => media.id === id);

  if (index !== -1) {
    return medias[index].comments;
  } else {
    return null;
  }
};

export const findCommentById = async (mediaId, commentId) => {
  const medias = await getMedia();
  const index = medias.findIndex((media) => media.id === mediaId);

  if (index !== -1) {
    const singleComment = medias[index].comments.find(
      (comment) => comment.id === commentId
    );
    return singleComment;
  } else {
    return null;
  }
};

//later to add: update PUT method
export const findCommentByIdAndUpdate = async (mediaId, commentId, update) => {
  const medias = await getMedia();
  const index = medias.findIndex((media) => media.id === mediaId);
  if (index !== -1) {
    const commentsArray = findComments(mediaId);
    const i = commentsArray.findIndex((comment) => comment.id === commentId);
    commentsArray[i].comments = singleComment;
    const commentUpdate = {
      ...singleComment,
      update,
      updatedAt: new Date(),
    };
    commentsArray[i].comments = commentUpdate;
    await writeMedia(medias);

    return commentUpdate;
  } else {
    return null;
  }
};

export const findCommentByIdAndDelete = async (mediaId, commentId) => {
  const medias = await getMedia();
  const index = medias.findIndex((media) => media.id === mediaId);

  if (index !== -1) {
    const commentIndex = medias[index].comments.findIndex(
      (comment) => comment.id === commentId
    );
    if (commentIndex !== -1) {
      medias[index].comments = medias[index].comments.filter(
        (comment) => comment.id !== commentId
      );
      await writeMedia(medias);
      return medias[index].comments;
    } else {
      return null;
      //throw new createHttpError(404, `Comment with id ${commentId} not found!`);
    }
  } else {
    return null;
    //throw new createHttpError(404, `Comment with id ${commentId} not found!`);
  }
};
