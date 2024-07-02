var express = require("express");

const authRoutes = require("./auth.routes.js");
const commonRoutes = require("./commonRoutes.js");
const rentRoutes=require('./rent/rentRoutes.js')

var app = express();


app.use("/auth/", authRoutes);
app.use("/common/", commonRoutes);
// app.use("/rentRoutes/", rentRoutes);







module.exports = app;