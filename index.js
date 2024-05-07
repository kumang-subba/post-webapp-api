import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import imageUpload from "./routes/image-upload.js";
import auth from "./routes/auth.js";
import posts from "./routes/posts.js";
import users from "./routes/users.js";
import link from "./routes/link.js";

const port = process.env.port || 8080;
const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    // origin: "https://kumang-subba.github.io",
  })
);
app.use(cookieParser());

app.use("/api", imageUpload);
app.use("/api", auth);
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/link", link);

app.listen(port, () => {
  console.log("connected");
});
