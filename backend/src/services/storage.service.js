import cloudinary from "./cloudinary.config.js";

const uploadfile = async (fileBuffer, publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "video",
          public_id: publicId,
          folder: "foodVideos",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      )
      .end(fileBuffer);
  });
};

export default uploadfile;
