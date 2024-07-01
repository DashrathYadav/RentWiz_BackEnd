var express = require("express");

const authRoutes = require("./auth.routes.js");
const commonRoutes = require("./commonRoutes.js");

var app = express();


app.use("/auth/", authRoutes);
app.use("/common/", commonRoutes);




module.exports = app;