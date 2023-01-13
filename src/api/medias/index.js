import express from "express";
import httpErrors from "http-errors";
import {
  findCommentById,
  findCommentByIdAndDelete,
  findComments,
  saveNewComment,
} from "../../db/commentsTools.js";
import {
  findMedia,
  findMediaById,
  findMediaByIdAndDelete,
  findMediaByIdAndUpdate,
  saveNewMedia,
} from "../../db/mediaTools.js";

const { NotFound, Unauthorized, BadRequest } = httpErrors;
const mediasRouter = express.Router();
const beUrl = process.env.BE_URL;

mediasRouter.post("/", async (req, res, next) => {
  try {
    const id = await saveNewMedia(req.body);
    if (id) {
      res.status(200).send(`post with id ${id} saved successfully`);
      console.log(req.body);
    } else {
      next(BadRequest(`Item ${req.params.id} not saved!`));
    }
  } catch (error) {
    next(error);
  }
});

mediasRouter.get("/", async (req, res, next) => {
  try {
    const medias = await findMedia();
    res.send(medias);
  } catch (error) {
    next(error);
  }
});

//get single one:
mediasRouter.get("/:mediaId", async (req, res, next) => {
  try {
    const medias = await findMediaById(req.params.mediaId);
    if (medias) {
      res.send(medias);
    } else {
      next(BadRequest(`Item with id ${req.params.mediaId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});
mediasRouter.put("/:mediaId", async (req, res, next) => {
  try {
    const updatedMedia = await findMediaByIdAndUpdate(
      req.params.mediaId,
      req.body
    );
    if (updatedMedia) {
      res.send(updatedMedia);
    } else {
      next(BadRequest(`Item with id ${req.params.mediaId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});
mediasRouter.delete("/:mediaId", async (req, res, next) => {
  try {
    const updatedMediaArr = await findMediaByIdAndDelete(req.params.mediaId);
    if (updatedMediaArr) {
      res.status(204).send();
    } else {
      next(NotFound(`Item with id ${req.params.mediaId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

// **************************************COMMENTS CRUD

mediasRouter.post("/:mediaId/comments", async (req, res, next) => {
  try {
    const comment = await saveNewComment(req.params.mediaId, req.body);
    if (comment) {
      res.send.comment;
      console.log(comment, "comment sent");
    } else {
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

mediasRouter.get("/:mediaId/comments", async (req, res, next) => {
  try {
    const comments = await findComments(req.params.mediaId);
    if (comments) {
      res.send.comments;
      console.log(comments);
    } else {
    }
  } catch (error) {
    next(error);
  }
});

mediasRouter.get("/:mediaId/comments/:commentId", async (req, res, next) => {
  try {
    const comment = await findCommentById(
      req.params.mediaId,
      req.params.commentId
    );

    res.send.comment;
    console.log(comment);
  } catch (error) {
    next(error);
  }
});

// LATER ADD THE PUT METHOD
mediasRouter.put("/:mediaId/comments/:commentId", async (req, res, next) => {
  try {
    if (condition) {
    } else {
    }
  } catch (error) {
    next(error);
  }
});

mediasRouter.delete("/:mediaId/comments/:commentId", async (req, res, next) => {
  try {
    await findCommentByIdAndDelete(req.params.mediaId, req.params.commentId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default mediasRouter;
