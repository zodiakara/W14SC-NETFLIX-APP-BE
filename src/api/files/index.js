import express from "express";
import multer from "multer";
import { pipeline } from "stream";
import { extname } from "path";
import { getPDFReadableStream } from "../../lib/pdf-tools.js";
import { findMediaById, findMediaByIdAndUpdate } from "../../db/mediaTools.js";
import { saveMediaPosters } from "../../lib/fs-tools.js";

const filesRouter = express.Router();
const beUrl = process.env.BE_URL;

//get media pdf file
filesRouter.get("/:mediaId/pdf", async (req, res, next) => {
  try {
    const media = await findMediaById(req.params.mediaId);
    if (media) {
      res.setHeader("Content-Disposition", "attachment; filename=test.pdf");
      const source = getPDFReadableStream(media);
      const destination = res;
      pipeline(source, destination, (err) => {
        if (err) console.log(err);
      });
    } else {
      next(NotFound(`Media with id ${req.params.mediaId} has not been found!`));
    }
  } catch (error) {
    next(error);
  }
});

//add image as a movie poster
filesRouter.patch(
  "/:mediaId/upload",
  multer().single("poster"),
  async (req, res, next) => {
    try {
      const originalFileNameExtension = extname(req.file.originalname);
      const fileName = req.params.mediaId + originalFileNameExtension;

      await saveMediaPosters(fileName, req.file.buffer);
      const url = `${beUrl}/img/medias/${fileName}`;
      req.body = { ...req.body, poster: url };

      const updatedMedia = findMediaByIdAndUpdate(req.params.mediaId, req.body);
      if (updatedMedia) {
        res.send(updatedMedia);
        console.log("file saved!");
      } else {
        next(BadRequest(`Item with id ${req.params.mediaId} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);

export default filesRouter;
