import express from "express";
import axios from "axios";
const router = express.Router();

router.get("/", async (req, res) => {
  const href = req.query.url;

  if (!href) {
    return res.status(400).send({
      message: "Invalid url",
    });
  }
  const response = await axios.get(href);

  // Parse the HTML using regular expressions
  const titleMatch = response.data.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : "";

  const descriptionMatch = response.data.match(
    /<meta name="description" content="(.*?)"/
  );
  const description = descriptionMatch ? descriptionMatch[1] : "";

  const imageMatch = response.data.match(
    /<meta property="og:image" content="(.*?)"/
  );
  const imageUrl = imageMatch ? imageMatch[1] : "";

  return res.status(200).json({
    success: 1,
    meta: {
      title,
      description,
      image: {
        url: imageUrl,
      },
    },
  });
});

export default router;
