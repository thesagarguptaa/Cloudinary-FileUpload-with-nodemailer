const File = require("../models/File");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

//image upload handler

function ifFileTypeSupported(fileType, supportedTypes) {
  return supportedTypes.includes(fileType);
}

async function uploadFileTOCloudinary(file, folder) {
  const option = { folder };

  console.log("temp file path", file.tempFilePath);

  // if (quality) {
  //   option.quality = quality;
  // }

  option.resource_type = "auto";

  return await cloudinary.uploader.upload(file.tempFilePath, option);
}

exports.imageUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log("fetch data ", name, tags, email);

    const file = req.files.file;
    console.log("fetch file");
    console.log("API_SECRET", process.env.API_SECRET);

    //Validation
    const supportedTypes = ["jpeg", "jpg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("file Type: ", fileType);

    if (!ifFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: true,
        message: "File format is not supported",
      });
    }

    console.log("Type is supported");

    //Uploading in cloud

    const response = await uploadFileTOCloudinary(file, "Codehelp");
    console.log(response);

    //db entry ;
    const entry = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      imageUrl: response.secure_url,
      message: "image is successfully uploaded in cloudinary",
      entry: entry,
    });
  } catch (err) {
    res.status(400).json({
      success: true,
      message: "error in code ",
      error: err,
    });
  }
};

//video upload
exports.videoUpload = async (req, res) => {
  try {
    //fetch data
    const { name, tags, email } = req.body;
    console.log("fetch data ", name, tags, email);

    //fetch file
    const file = req.files.file;
    console.log("fetch file");

    //check supported file
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();

    console.log(fileType);

    if (!ifFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file format is not supported",
      });
    }

    console.log("file type is supported");

    //upload in cloudinary

    const response = await uploadFileTOCloudinary(file, "Codehelp");
    console.log(response);

    //db me entry

    const entry = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      message: "enter in db successfully ",
      imageUrl: response.secure_url,
      entry: entry,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "error in code",
      error: err,
    });
  }
};
