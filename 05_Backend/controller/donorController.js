
// Importing internal dependencies (Model, Validators)

// import requireLogin from "../middleware/requireLogin.js";
// import Orphanage from "../model/orphanage.js"
// import inventory from "../model/Inventory.js";
import Donation from "../model/donation.js";
import Causes from "../model/causes.js";
import Users from '../model/Users.js';
import jwt from 'jsonwebtoken';



// /**To Get the List of all Donors
//  * */  
const donorList=async (req, res) => {
  try {
    //Finding the role==="CompanyUser"
    const companyUsers = await User.find({ role: 'CompanyUser' });
    // Return the list of company users
    res.json(companyUsers);
  } catch (error) {
    console.error('Error fetching company users:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};



// Controller function to get user profile details
const getUserProfile = async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization;

    // Decode the token to extract the user's ID
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;

    // Retrieve user profile details from the database based on user ID
    const userProfile = await Users.findById(userId).select('username role phone_number email address');

    // Check if user profile exists
    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    // If user profile exists, send it in the response
    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


/**
 * API to get all the causes
 */
const getAllCauses = async (req, res) => {
  try {
    const allCauses = await Causes.find();
    res.json(allCauses);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal server error');
  }
};


const createDonation = async (req, res) => {
  try {
    const donationDetails = {
      organization: req.organization._id,
      donor: req.donor._id,
      amount: req.body.amount,
      causeTitle: req.body.causeTitle
    };
    const donation = new Donation(donationDetails);
    await donation.save();
    res.status(201).json(donation);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
}



export default{
   getUserProfile, getAllCauses, donorList, createDonation
}
