import Cause from "../model/causes.js";
import Organization from "../model/organization.js";
import jwt from "jsonwebtoken";
import { dataUri } from "../middleware/multerMiddleware.js";
import { uploader } from "../config/cloudinaryConfig.js";

// Controller function for creating a cause and associating it with an organization
const createCause = async (req, res) => {
  try {
    // Token is of the format Bearer `token` in the headers
    const token = req.headers.authorization?.split(" ")[1];

    // Verify and decode the token to extract user ID
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    const userId = decoded._id;
    
    // Fetch user data from the database based on the user ID
    const user = await Organization.findById(userId);
   
    const { name, fundsRequired, category, descriptionText, descriptionImage } =
      req.body;
    const causeDetails = {
      organization: userId,
      title: name,
      fundsRequired: fundsRequired,
      category: category,
      descriptionText: descriptionText,
      descriptionImage: descriptionImage,
    };
    const cause = new Cause(causeDetails);
    await cause.save();
    res.status(200).json({"message":"The cause has successfully changed "});
  } catch (error) {
    console.error(error.message);
    res.status(500).send({"message":"Internal Server Error"});
  }
};


/**Uploads an image file to Cloudinary.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with a success or error message.
*/
const upload = async (req, res) => {
  // Check if the file exists in the request
  if (!req.file) {
    return res.status(400).json({
      message: 'No file uploaded. Please ensure you are uploading a valid image file.',
    });
  }

  try {
    // Convert the uploaded file to a format suitable for Cloudinary
    const file = dataUri(req).content;

    // Attempt to upload the file to Cloudinary
    const result = await uploader.upload(file);

    // If upload is successful, send the URL of the uploaded image in the response
    if (result.url) {
      return res.status(200).json({
        message: 'Your image has been uploaded successfully to Cloudinary.',
        imageurl: result.url,
      });
    } else {
      // Handle unexpected cases where the upload succeeds but no URL is returned
      return res.status(500).json({
        message: 'Image uploaded, but no URL was returned. Please try again.',
      });
    }
  } catch (err) {
    // Catch and handle any errors during the upload process
    console.error('Upload failed', err);
    return res.status(400).json({
      message: 'Something went wrong while processing your request. Please try again.',
    });
  }
};

export default { createCause, upload };