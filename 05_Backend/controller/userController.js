
// Importing internal dependencies (Model, Validators)
import User from "../model/Users.js";
import { emailValidator, passwordValidator, usernameValidator } from "../dependencies/validations/userValidations.js";
import signupValidation from "../dependencies/validations/signupValidation.js";
import Users from "../model/Users.js";



const LandingPageDetails=async (req, res) => {
  try {
    // Find the admin user based on their role
    const adminUser = await User.findOne({ role: 'admin' });
    //If the admin is not present 
    if (!adminUser) {
        return res.status(404).json({ message: 'Admin not found' });
    }
    // Return only email and phone number of the admin
    const { email, phone_number,username } = adminUser;
    res.json({ email, phone_number ,username});
} catch (error) {
    console.error('Error fetching Landing Page Details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
};

export default{
  LandingPageDetails
}

