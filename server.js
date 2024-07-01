require("dotenv").config();
const express = require("express");
const cors = require("cors");
var cookieParser = require("cookie-parser");
const multer = require("multer");
var bodyParser = require('body-parser');
var upload = multer();
var apiRouter = require("./src/routes/api.routes");

const app = express();
global.__basedir = __dirname;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//To allow cross-origin requests
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use('/api/images', function (req, res, next) {
    //console.log(__dirname  + process.env.FILE_LOCATION );
    next();
}, express.static(__dirname + process.env.FILE_LOCATION));
app.use("/api/", apiRouter);

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

