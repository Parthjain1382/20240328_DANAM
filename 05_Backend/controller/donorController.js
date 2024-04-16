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


/**Get the User Data  
 * @param {*} req The user from the require Login
 * @param {*} res the userdata that is found in the database
 */
const getDonor=async (req,res)=>{
  const id=req.query.id
  
  try{
    const userData=await Users.findById(id)
    if(!userData){
      res.status(401).json("User not found")
    }
    console.log(userData);
    res.status(200).json(userData)
  }
  catch{
    res.status(500).send("Server Error");
  }
}


// Controller function to get user profile details
const getUserProfile = async (req, res) => {
  try {
    // Get user ID from the request object (assuming it's attached by the authentication middleware)
    const userId = req.user._id;
    console.log(userId);
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
    console.log(cause)
    if (!cause) {
      return res.status(404).json({ message: "Cause not found" });
    }
    console.log(cause);
    res.status(200).json(cause);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const createDonation = async (req, res) => {
  try {
    const donationDetails = {
      organization: req.body.organization,
      Donor: req.body.donor,
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

/**To change the cause Schema when a Donor Donate to a Specific Cause
 * @param {*} req causeId and AmountDonated
 * @param {*} res The new Changes in the cause Object 
 */
const putCause= async(req,res)=>{
  const  causeId  = req.query.causeId;
  const amountDonated  = req.body.amountDonated; 
    try {
        // Find the cause by ID
        const cause = await Causes.findById(causeId);

        if (!cause) {
            return res.status(404).send('Cause not found');
        }
        
        if(amountDonated+cause.fundsRaised>cause.fundsRequired){
          return res.status(200).send("The donation Amount is greater than required");
        }

        // Update fundsRaised and numberOfDonors
        cause.fundsRaised += amountDonated;
        cause.numberOfDonors += 1;
        // Check if fundsRaised equals or exceeds fundsRequired
      
        if (cause.fundsRaised == cause.fundsRequired) {
            cause.status = 'completed';
        }
      
        // Save the updated cause
        await cause.save();
        res.status(200).json({ message: 'Cause updated successfully', cause });
    } catch (error) {
        console.error('Error updating cause:', error);
        res.status(500).send('Server error');
    }  
}

const userDonate=async(req,res)=>{
  const  donorId  = req.query.donorId;
  const  amountDonated = req.body.amountDonated; 

  try {
    // Find the cause by ID
    const user = await Users.findById(donorId);

    if (!user) {
        return res.status(404).send('user not found');
    }

    // Update NumberofDonation by 1 and numberOfDonors
    user.numberOfDonations+=1
    user.contributionAmmount+=amountDonated

    // Save the updated cause
    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
} catch (error) {
    console.error('Error updating User Data:', error);
    res.status(500).send('Server error');
}  
}


export default {
  getUserProfile,
  getAllCauses,
  donorList,
  createDonation,
  getCauseById,
  organizationById,
  getDonor,
  putCause,
  userDonate
};
