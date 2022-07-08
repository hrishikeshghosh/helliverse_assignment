import express from "express";
import {
  deleteProfile,
  getProfile,
  signin,
  signup,
} from "../Controller/UserController.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile/:id", getProfile);
router.delete("/deleteProfile/:id", deleteProfile);

export default router;
