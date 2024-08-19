var express = require("express");

const authRoutes = require("./auth.routes.js");
const commonRoutes = require("./commonRoutes.js");
const userRoutes = require("./user.routes");
const propertyRoutes = require("./property.routes");
const roomRoutes = require("./room.routes");

var app = express();


app.use("/auth/", authRoutes);
app.use("/user/", userRoutes);
app.use("/property/", propertyRoutes);
app.use("/room/",roomRoutes);




module.exports = app;