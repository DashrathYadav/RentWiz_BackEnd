var express = require("express");

const authRoutes = require("./auth.routes.js");
const commonRoutes = require("./commonRoutes.js");
const userRoutes = require("./user.routes");

var app = express();


app.use("/auth/", authRoutes);
app.use("/user/", userRoutes);
app.use("/common/", commonRoutes);




module.exports = app;