import bcrypt from "bcryptjs/dist/bcrypt.js";
import { db } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const register = (req, res) => {
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const insertQuery = "INSERT INTO users(`username`, `password`) VALUES (?)";
    const values = [req.body.username, hashedPassword];
    db.query(insertQuery, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created.");
    });
  });
};
export const login = (req, res) => {
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User does not exist");

    const passwordMatch = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!passwordMatch)
      return res.status(400).json("Wrong username or password");

    const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET_KEY);
    const { password, ...other } = data[0];

    res.cookie("access_token", token).status(200).json(other);
  });
};
export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out");
};
