import express from "express";
import { isAuth, isSeller } from "../middlewares/isAuth.js";
import {
  addRestraunt,
} from "../controllers/restaurant.js";
import uploadFile from "../middlewares/multer.js";

const router = express.Router();

router.post("/new", isAuth, isSeller, uploadFile, addRestraunt);


export default router;
