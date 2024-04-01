
// Importing internal dependencies (Model, Validators)
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

    // Send user profile details in the response
    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



export default{
  donorList, getUserProfile
}
