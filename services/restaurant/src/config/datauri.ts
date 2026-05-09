/**
 * This file contains the configuration for the data URI parser. It is used to convert the uploaded file into a data URI format that can be stored in the database.
 * The getBuffer function takes a file object as input and returns the data URI format of the file.
 */
import DataUriParser from "datauri/parser.js";
import path from "path";

const getBuffer = (file: any) => {
  const parser = new DataUriParser();

  const extName = path.extname(file.originalname).toString();

  return parser.format(extName, file.buffer);
};

export default getBuffer;
