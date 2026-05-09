/**
 * This file is responsible for handling file uploads using multer middleware.
 * It uses memory storage to store the uploaded files in memory as buffers, which can then be processed and stored in the database.
 * The uploadFile middleware is exported for use in routes where file uploads are required.
 */

import multer from "multer";

const storage = multer.memoryStorage();

const uploadFile = multer({ storage }).single("file");

export default uploadFile;
