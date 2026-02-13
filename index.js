require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const userRoutes = require("./src/api/routes/user");
const postRoutes = require("./src/api/routes/post");
const commentRoutes = require("./src/api/routes/comment")

const app = express();
app.use(express.json());
const PORT = process.env.PORT

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

connectDB();
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});