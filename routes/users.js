import express from "express";
import { updateSetting } from "../controllers/userController.js";

const router = express.Router();

router.put("/update", updateSetting);

export default router;
