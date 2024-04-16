import Cause from "../model/causes.js";
import Organization from "../model/organization.js";
import jwt from "jsonwebtoken";

// Controller function for creating a cause and associating it with an organization
const createCause = async (req, res) => {
  try {
    // Token is of the format Bearer `token` in the headers
    const token = req.headers.authorization?.split(" ")[1];

    // Verify and decode the token to extract user ID
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    const userId = decoded._id;
    console.log(userId);
    // Fetch user data from the database based on the user ID
    const user = await Organization.findById(userId);
    console.log(user);
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
    res.status(201).json(cause);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

export { createCause };