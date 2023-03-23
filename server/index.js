import bodyParser from "body-parser";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./Controllers/Auth.js";
import { addPost } from "./Controllers/Post.js";
import { verifyToken } from "./Middlewares/Auth.js";
import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";

// #################
// # Configuration #
// #################
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// ################
// # File Storage #
// ################
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// #####################
// # Routes With Files #
// #####################
app.post("/auth/register", upload.single("avatar"), register);
app.post("/posts", verifyToken, upload.single("image"), addPost);

// ##########
// # Routes #
// ##########
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);

// ##################
// # Mongoose Setup #
// ##################
const PORT = process.env.PORT | 5000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(chalk.green(`Server Running... \n Port: ${PORT}`))
    );
  })
  .catch((error) => {
    console.log(chalk.red(`Error... \n ${error}`));
  });
