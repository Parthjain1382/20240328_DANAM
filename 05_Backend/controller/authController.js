// Importing external dependencies
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Importing internal dependencies (Model, Validators)
import { emailValidator, passwordValidator, usernameValidator } from "../dependencies/validations/userValidations.js";
import signupValidation from "../dependencies/validations/signupValidation.js";
import Users from "../model/Users.js";

//Function for signUp 
const signUp = async (req, res) => {
  try {;
      // Extracting user data from request body
      const {  username, password, email, phone_number, address, companyName, companyEmail  } = req.body;
      const userData = {  username, password, email, phone_number, address, companyName, companyEmail  };

      // Validating user input
      const validations = signupValidation(userData);
      if (validations.error) {
          return res.status(400).json(validations);
      }

      // Checking if the email already exists
      const existingUser = await Users.findOne({ email: email });
      if (existingUser) {
          return res.status(422).json({ error: `User with email ${email} already exists` });
      }

      // Hashing the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Creating a new user
      const newUser = new Users({
        username: username,
        email: email,
        password: hashedPassword,
        phone_number: phone_number,
        address: address,
        companyName: companyName,
        companyEmail: companyEmail
      });

      // Saving the new user to the database
      await newUser.save();
      return res.json({ message: "User registered successfully" });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
  }
};


//Function for Login
const login= async (req, res) => {
  try {
      // Extracting email and password from request body
      const { email, password } = req.body;

      // Validating email and password
      if (!passwordValidator(password) || !emailValidator(email)) {
          return res.status(422).json({ error: "Please provide valid email and password" });
      }

      // Finding the user by email
      const user = await Users.findOne({ email: email });
      
      if (!user) {
          return res.status(422).json({ error: "Invalid email or password" });
      }

      // Comparing the provided password with the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
          // Generating JWT token and adding the payload and session timer
          const token = jwt.sign({ _id: user._id, role: user.role , email:user.email}, process.env.SECRET_KEY,{ expiresIn: process.env.SESSION_TIMER });
          console.log(user);
          return res.json({ token } );
      } else {
          return res.status(422).json({ error: "Invalid email or password" });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
  }
};



export default{
  signUp,
  login
}