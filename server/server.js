const express = require("express");
const app = express();

require("dotenv").config();
const fileUpload = require("express-fileupload");
app.use(fileUpload());

const s3Client = require("./config/s3setup");
// Pass s3client to POST-upload route
require("./routes/POST-upload.js")(app, s3Client);

app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// TODO: Configure database connections, authentication, and other application-level settings

// Middleware
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const authRouter = require("./routes/auth");
const guessRouter = require("./routes/guesses");
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/auth", authRouter);
app.use("/make_guess", guessRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
