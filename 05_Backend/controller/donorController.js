
// Importing internal dependencies (Model, Validators)

import requireLogin from "../middleware/requireLogin.js";
import Orphanage from "../model/orphanage.js"
import inventory from "../model/Inventory.js";
import Donation from "../model/donation.js";
import Causes from "../model/causes.js";
import Users from '../model/Users.js';




// /**To Get the List of all Donors
//  * */  
// const donorList=async (req, res) => {
//   try {
//     //Finding the role==="CompanyUser"
//     const companyUsers = await User.find({ role: 'CompanyUser' });
//     // Return the list of company users
//     res.json(companyUsers);
//   } catch (error) {
//     console.error('Error fetching company users:', error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };



// Controller function to get user profile details
const getUserProfile = async (req, res) => {
  try {
    // Get user ID from the request object (assuming it's attached by the authentication middleware)
    const userId = req.user.id;

    // Retrieve user profile details from the database based on user ID
    const userProfile = await Users.findById(userId).select('username role phone_number email address numberOfDonations contributionAmmount');

    // Check if user profile exists
    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }
  }
  catch(error){
    console.log(error.message);
  }
}


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



export default{
   getUserProfile, getAllCauses
}
