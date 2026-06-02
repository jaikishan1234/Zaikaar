import express from "express";
import { isAuth, isSeller } from "../middlewares/isAuth.js";
import {
  addRestraunt,
  fetchMyRestaurant,
  updateRestaurant,
  updateStatusRestaurant
} from "../controllers/restaurant.js";
import uploadFile from "../middlewares/multer.js";

const router = express.Router();

/**
 * @route POST /api/restaurant/new
 * @desc Create a new restaurant
 * @access Private (Seller)
 */
router.post("/new", isAuth, isSeller, uploadFile, addRestraunt);

/**
 * @route GET /api/restaurant/my
 * @desc Get the restaurant of the authenticated seller
 * @access Private (Seller)
 */
router.get("/my", isAuth, isSeller, fetchMyRestaurant);

/**
 * @route PUT /api/restaurant/status
 * @desc Update the status of the authenticated seller's restaurant
 * @access Private (Seller)
 */
router.put("/status", isAuth, isSeller, updateStatusRestaurant);

/**
 * @route PUT /api/restaurant/edit
 * @desc Update the details of the authenticated seller's restaurant
 * @access Private (Seller)
 */
router.put("/edit", isAuth, isSeller, updateRestaurant);

export default router;
