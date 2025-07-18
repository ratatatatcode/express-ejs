require("module-alias/register");
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");
const authRoutes = require("@/routes/authRoutes");

const app = express();

app.set("trust proxy", 1);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});
