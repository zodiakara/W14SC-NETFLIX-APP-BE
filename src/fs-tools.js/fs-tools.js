import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs-extra";

const { readJSON, writeJSON, writeFile } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");
const publicMediaFolderPath = join(process.cwd(), "./public/img/medias");

//paths for data
const mediaJSONPath = join(dataFolderPath, "media.json");

console.log("media JSON path ---->", mediaJSONPath);
console.log("data folder path ---->", dataFolderPath);
console.log("public movies folder path ---->", publicMediaFolderPath);

//movies files
export const getMedia = () => readJSON(mediaJSONPath);
export const writeMedia = (media) => writeJSON(mediaJSONPath, media);

export const saveMediaPosters = (fileName, contentAsABuffer) =>
  writeFile(join(publicMediaFolderPath, fileName), contentAsABuffer);
