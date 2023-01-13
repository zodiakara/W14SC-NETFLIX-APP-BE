import express from "express";
import httpErrors from "http-errors";
import { saveNewMedia } from "../../db/mediaTools.js";

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
      next(BadRequest(`Item ${req.params.blogpostId} not saved!`));
    }
  } catch (error) {
    next(error);
  }
});

export default mediasRouter;
