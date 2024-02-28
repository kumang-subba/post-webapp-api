import jwt from "jsonwebtoken";
import { db } from "../db.js";

export const getAllPosts = (req, res) => {
  const query = req.query.category
    ? "SELECT posts.*, GROUP_CONCAT(categories.name) AS categories, users.username as author, users.image as authorImg FROM posts JOIN post_category ON posts.id = post_category.post_id JOIN categories ON post_category.category_id = categories.id JOIN users on posts.uid = users.id WHERE categories.name = ? GROUP BY posts.id LIMIT 10"
    : "SELECT posts.*, GROUP_CONCAT(categories.name) AS categories, users.username as author, users.image as authorImg FROM posts JOIN post_category ON posts.id = post_category.post_id JOIN categories ON post_category.category_id = categories.id JOIN users on posts.uid = users.id GROUP BY posts.id LIMIT 10";
  db.query(query, [req.query.category], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getPost = (req, res) => {
  const query =
    "SELECT posts.*, GROUP_CONCAT(categories.name) AS categories, users.username AS author, users.image AS authorImg " +
    "FROM posts JOIN post_category ON posts.id = post_category.post_id " +
    "JOIN categories ON post_category.category_id = categories.id " +
    "JOIN users ON posts.uid = users.id " +
    "WHERE posts.id = ?";
  // ("SELECT posts.id, `username`, `title`, `content`, p.coverImage, u.image AS userImg,`created_at`,`updated_at` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ");

  db.query(query, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};
export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const query =
      "INSERT posts(`title`,`content`,`coverImage`,`uid`) VALUES (?)";
    const values = [
      req.body.title,
      req.body.content,
      req.body.coverImage,
      userInfo.id,
    ];
    db.query(query, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      const postId = data.insertId;
      for (const category in req.body.categories) {
        db.query(
          "INSERT INTO post_category(`post_id`, `category_id`) VALUES (?, (SELECT `id` FROM categories WHERE `name` = ?))",
          [postId, req.body.categories[category]]
        );
      }
      return res.json(postId);
    });
  });
};
export const deletePost = (req, res) => {
  res.json("asd");
};
export const updatePost = (req, res) => {
  res.json("asd");
};
