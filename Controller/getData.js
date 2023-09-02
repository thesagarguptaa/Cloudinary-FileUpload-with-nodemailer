const File = require("../models/File");

exports.fetchData = async (req, res) => {
  try {
    const fetch = await File.find({});

    res.json({
      success: true,
      message: "fetch all data",
      Data: fetch,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: " error in code",
      error: err,
    });
  }
};
