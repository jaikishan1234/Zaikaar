import express from "express";
import { isAuth, isSeller } from "../middlewares/isAuth.js";
import {
  addMenuItem,
  deleteMenuItem,
  getAllItems,
  toggleMenuItemAvailability,
} from "../controllers/menuitem.js";
import uploadFile from "../middlewares/multer.js";

const router = express.Router();

/**
 * @route POST /api/menuitem/new
 * @desc Add a new menu item to the authenticated seller's restaurant
 * @access Private (Seller)
 */
router.post("/new", isAuth, isSeller, uploadFile, addMenuItem);

/**
 * @route GET /api/menuitem/all/:id
 * @desc Get all menu items for a specific restaurant
 * @access Private
 */
router.get("/all/:id", isAuth, getAllItems);

/**
 * @route DELETE /api/menuitem/:itemId      
 * @desc Delete a menu item by its ID
 * @access Private (Seller)
 */
router.delete("/:itemId", isAuth, isSeller, deleteMenuItem);

/**
 * @route PUT /api/menuitem/status/:itemId
 * @desc Toggle the availability status of a menu item by its ID
 * @access Private (Seller)
 */
router.put("/status/:itemId", isAuth, isSeller, toggleMenuItemAvailability);

export default router;
