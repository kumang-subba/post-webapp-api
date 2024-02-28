import express from "express";
import {
  addPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;
