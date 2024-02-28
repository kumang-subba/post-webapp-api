import express from "express";
import multer from "multer";
import { generateUploadURL } from "../s3.js";
import path from "path";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/imageUrl", upload.single("image"), async (req, res) => {
  const ext = path.extname(req.file.originalname);
  if (!["png", "jpeg", "jpg", "gif"].includes(ext.slice(1))) {
    return res.status(400).send({
      message: "Invalid file",
    });
  }
  const url = await generateUploadURL(ext);
  res.send({ url });
});

export default router;
