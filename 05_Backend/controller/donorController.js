
// Importing internal dependencies (Model, Validators)

import requireLogin from "../middleware/requireLogin.js";
// import Orphanage from "../model/orphanage.js";
// import inventory from "../model/Inventory.js";
// import Donation from "../model/donation.js";
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
    // Extract the JWT token from the request headers
    const token = req.headers.authorization;
    
    // Verify and decode the token to extract user ID
    const decoded = jwt.verify(token,  process.env.SECRET_KEY);
    console.log(decoded);
    const userId = decoded._id;
    
    // Fetch user data from the database based on the user ID
    const user = await Users.findById(userId);
    
    // If user data is not found
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Return user data as response
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
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
