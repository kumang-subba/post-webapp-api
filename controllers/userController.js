import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../db.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";

dotenv.config();

export const updateSetting = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    let query = "UPDATE users SET ";
    let values = [];
    if (req.body.username) {
      query += "`username`=? ";
      values = [req.body.username];
    }
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      query += ",`password`=? ";
      values = [...values, hashedPassword];
    }
    if (req.body.image) {
      query += ",`image`=? ";
      values = [...values, req.body.image];
    }
    query += "WHERE id=?";
    values = [...values, userInfo.id];

    db.query(query, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been updated.");
    });
  });
};
