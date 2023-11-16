const cloudinary = require("cloudinary").v2;

const uploadImageAndVideoToCloudinary = async (
  file,
  folder,
  height,
  quality
) => {
  const options = { folder, resource_type: "auto" };

  if (quality) {
    options.quality = quality;
  }

  if (height) {
    options.height = height;
  }

  return await cloudinary.uploader.upload(file.tempFilePath, options);
};

module.exports = uploadImageAndVideoToCloudinary;
