
// Importing internal dependencies (Model, Validators)
import requireLogin from "../middleware/requireLogin.js";
import Orphanage from "../model/orphanage.js"
import inventory from "../model/Inventory.js";
import Donation from "../model/donation.js";


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


export default{
  donorList
}
