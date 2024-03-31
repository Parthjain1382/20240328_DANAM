
// Importing internal dependencies (Model, Validators)
import requireLogin from "../middleware/requireLogin.js";
import Orphanage from "../model/orphanage.js"
import inventory from "../model/Inventory.js";
import Donation from "../model/donation.js";
import Cause from "../model/causes.js";


/**To Get the List of all Donors
 * */  
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



/**
 * API to get all the causes
 */
const getAllCauses = async (req, res) => {
  try {
    const allCauses = await Cause.find();
    res.json(allCauses);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal server error');
  }
}


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


export {
  donorList,
  getAllCauses,
  createDonation
}
