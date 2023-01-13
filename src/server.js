import express from "express";
import createHttpError from "http-errors";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import { join } from "path";
import {
  badRequestHandler,
  genericErrorHandler,
  notFoundHandler,
  unauthorizedHandler,
} from "./errorHandlers.js";
import mediasRouter from "./api/medias/index.js";
import filesRouter from "./api/files/index.js";

const server = express();
const port = process.env.PORT;

const publicFolderPath = join(process.cwd(), "./public");

const whitelist = [process.env.BE_URL, process.env.FE_DEV_URL];

const corsOpts = {
  origin: (origin, next) => {
    console.log("current origin:", origin);
    if (whitelist.indexOf(origin) !== -1) {
      next(null, true);
      // address is on the white list -> continue
    } else {
      next(createHttpError(400, `Origin ${origin} is not on the whitelist!!`));
    }
  },
};

server.use(express.static(publicFolderPath));
server.use(cors());
server.use(express.json());

// endpoints:
server.use("/medias", mediasRouter);
server.use("/medias", filesRouter);

// error handlers:
server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

server.listen(port, () => {
  console.log(`this server is running on port ${port}`);
  console.table(listEndpoints(server));
});
