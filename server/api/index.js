const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config({ path: "./.env" });
const cors = require("cors");
const bodyParser = require("body-parser");

const testRouter = require("../routes/test");
const userRouter = require("../routes/users");
const workspaceRouter = require("../routes/workspace");
const quizRouter = require("../routes/quiz");
const resRouter = require("../routes/response");

const { connectDb } = require("../utils/mongodb");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173"
];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ msg: "Server running 🚀" });
});

app.use(testRouter);
app.use(userRouter);
app.use(workspaceRouter);
app.use(quizRouter);
app.use(resRouter);

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
  if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
      console.log("App started on port", PORT);
    });
  }
});

module.exports = app;
