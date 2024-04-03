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
import Users from "../model/Users.js";
import Organization from "../model/organization.js";

// /**To Get the List of all Donors
//  * */
const donorList = async (req, res) => {
  try {
    //Finding the role==="CompanyUser"

    const companyUsers = await Users.find({ role: 'donor' });

   

    // Return the list of company users
    res.json(companyUsers);
  } catch (error) {
    console.error("Error fetching company users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to get user profile details
const getUserProfile = async (req, res) => {
  try {
    // Get user ID from the request object (assuming it's attached by the authentication middleware)
    const userId = req.user.id;

    // Retrieve user profile details from the database based on user ID
    // const userProfile = await Users.findById(userId).select(
    //   "username role phone_number email address numberOfDonations contributionAmmount"
    // );
    const userDonations = await Donation.find({ Donor: userId });
    console.log(userDonations);
    res.json(userDonations)
    // Check if user profile exists
    // if (!userProfile) {
    //   return res.status(404).json({ error: "User profile not found" });
    // }
    if (!userDonations) {
      return res.status(404).json({ error: "You have made no donations yet"});
    }
  } catch (error) {
    console.log(error.message);
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
    res.status(500).send("Internal server error");
  }
};

const getCauseById = async (req, res) => {
  const id = req.query._id;
  try {
    const cause = await Causes.findById(id);
    if (!cause) {
      return res.status(404).json({ message: "Cause not found" });
    }
    res.json(cause);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const createDonation = async (req, res) => {
  try {
    const donationDetails = {
      organization: req.organization._id,
      donor: req.donor._id,
      amount: req.body.amount,
      causeTitle: req.body.causeTitle,
    };
    const donation = new Donation(donationDetails);
    await donation.save();
    res.status(201).json(donation);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const organizationById = async (req, res) => {
  const id = req.query._id;
  try {
    const cause = await Organization.findById(id);
    if (!cause) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.json(cause);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
export default {
  getUserProfile,
  getAllCauses,
  donorList,
  createDonation,
  getCauseById,
  organizationById,
};
