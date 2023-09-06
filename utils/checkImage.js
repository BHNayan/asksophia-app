const sizeOf = require('image-size');

const checkImage = async (file, res) => {
  const fileExt = file.originalname.split(".").pop().toLowerCase();

  // Check file extension
  if (!["png", "jpg", "jpeg"].includes(fileExt)) {
    res.status(400);
    throw new Error("Only PNG, JPG or JPEG files are allowed");
  }

  const dimensions = sizeOf(file.buffer);

  if (dimensions.width > 400 || dimensions.height > 400) {
    res.status(400);
    throw new Error("Image dimensions should not exceed 400x400px");
  }
};

module.exports = {
  checkImage,
};
