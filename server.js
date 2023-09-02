const express = require("express");
const app = express();

//load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//midleware for parse json request body
app.use(express.json());
const fileupload = require("express-fileupload");

app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//import route for API Mount Routes
const New = require("./routes/fileUpload");
app.use("/api/v1", New);

//Start server
app.listen(PORT, () => {
  console.log(`Server is starte in this PORT ${PORT}`);
});

//Connect to database
const dbConnect = require("./Config/database");
dbConnect();

//Cloudinart Connect
const Cloudinary = require("./Config/Cloudinary");
Cloudinary.cloudinaryConnect();

// Default route
app.get("/", (req, res) => {
  res.send(`<h1>This is default route</h1>`);
});
