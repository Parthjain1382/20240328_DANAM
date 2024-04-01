import bcrypt from 'bcrypt';
import Users from '../model/Users.js';
import signupValidation from '../dependencies/validations/signupValidation.js';
import jwt from 'jsonwebtoken';
import { passwordValidator } from '../dependencies/validations/userValidations.js';
import nodemailer from 'nodemailer';
import randomstring from 'randomstring';

// Controller function for user signup
const userSignup = async (req, res) => {
    try {
        const { username, password, phone_number, email, address, role } = req.body;

        // Validate user input
        const validation = signupValidation({ username, email, password });
        if (!validation.success) {
            return res.status(400).json({ error: validation.error });
        }

        // Check if username or email already exists
        const existingUser = await Users.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new Users({
            username,
            password: hashedPassword,
            email,
            phone_number,
            address,
            role
        });

        // Save user to database
        await newUser.save();

        // Remove sensitive information before sending response
        newUser.password = undefined;

        // Send success response
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function for user login
const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await Users.findOne({ username });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        // Send success response with username and token
        res.status(200).json({ message: 'User signed in successfully', username: user.username, token });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};







// const orgSignup = async (req, res) => {
//   try {
//       const { name, email, password, location } = req.body;

//       // Validate user input
//       // const validation = signupValidation({ name, email, password });
//       // if (!validation.success) {
//       //     return res.status(400).json({ error: validation.error });
//       // }

//       // Check if username or email already exists
//       const existingOrg = await Organizations.findOne({ name });     //Doubt syntax coloring not happening
//       if (existingOrg) {
//           return res.status(400).json({ error: 'Username or email already exists' });

const orgSignup = async (req, res) => {
  try {
      const { name, email, password, location } = req.body;

      // Validate user input (You can uncomment this part if you have validation logic)
      // const validation = signupValidation({ name, email, password });
      // if (!validation.success) {
      //     return res.status(400).json({ error: validation.error });
      // }

      // Check if organization name already exists
      const existingOrg = await Organizations.findOne({ name });
      if (existingOrg) {
          return res.status(400).json({ error: 'Organization name already exists' });
      }

      // Create a new organization
      const newOrg = new Organizations({
          name,
          email,
          password, // Remember to hash the password before storing it in the database
          location
      });

      // Save the new organization to the database
      await newOrg.save();

      // Remove sensitive information before sending response
      newOrg.password = undefined;

      // Send success response
      res.status(201).json({ message: 'Organization registered successfully', organization: newOrg });
  } catch (error) {
      console.error('Error during organization registration:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

        
/**
* Send a reset password email.
* @param {object} req - The request object.
* @param {object} res - The response object.
* @returns {object} The response object.
*/
const forget_password = async (email) => { // Modified to accept email as a parameter
    try {
      // Finding user data based on the provided email
      const userData = await Users.findOne({ email: email }, { username: 1, email: 1 });
   
      // If user data is found
      if (userData) {
        // Generating a random string
        const randomString = randomstring.generate();
        
        // Updating the user's record with the generated token
        await Users.updateOne(
          { email: email },
          { $set: { token: randomString } }
        );
   
        // Sending the reset password email
        await sendResetPasswordMail(userData.username, userData.email, randomString);
   
        // Sending a success response
        return { success: true, msg: "Check mail and reset password!" };
      } else {
        // Sending a success response if email does not exist
        return { success: false, msg: "Email does not exist" };
      }
    } catch (error) {
      // Handling errors and returning an error response if an exception occurs
      return { success: false, msg: error.message };
    }
   };

/**
* Send a reset password email.
* @param {string} name - The user's name.
* @param {string} email - The user's email.
* @param {string} token - The reset password token.
*/
const sendResetPasswordMail = async (name, email, token) => {
 try {
   // Creating a transporter for sending emails using Gmail SMTP
   const transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
     port: 465,
     secure: true,
     requireTLS: true,
     auth: {
       user: config.emailUser,  // Your Gmail username
       pass: config.emailPassword,  // Your Gmail password
     },
       tls: {
         ciphers:'SSLv3'
     }
   });

   // Mail options for the reset password email
   const mailOptions = {
     from: config.emailUser,  // Sender's email address
     to: email,  // Recipient's email address
     subject: "For reset password",  // Email subject
     // Email body in HTML format
     html: `
       <p>Hi ${name},</p>
       <p>Please click the link below to reset your password:</p>
       <a href=http://localhost:4200/resetpassword?token=${token}>Reset password</a>
     `
   };

   // Sending the email
   transporter.sendMail(mailOptions, function (error, info) {
     if (error) {
       // Log an error if sending the email fails
       console.log(error);
     } else {
       // Log a success message if the email is sent successfully
       console.log("Mail Has been sent:-", info.response);
     }
   });
 } catch (error) {
   // Handling errors and sending an error response if an exception occurs
   res.status(400).send({ success: false, msg: error.message });
 }
};   

/**
* Resets the user password 
* @param {object} req - The request object.
* @param {object} res - The response object.
* @returns {object} The response object.
*/
const reset_password = async (req, res) => {
 try {
   // Extracting the token from the query parameters
   const token = req.query.token;
   console.log(token);
   
   
   // Finding user data based on the provided token
   const tokenData = await User.findOne({ token: token });
   console.log(tokenData);

   // If token data is found and it's not expired
   if (tokenData && !isTokenExpired(tokenData.tokenTimestamp)) {
     // Extracting the new password from the request body  
     const password = req.body.password;
     
     // Hashing the new password using bcrypt
     const newPass = await bcrypt.hash(password, 10);

     // Updating the user's record with the new password and clearing the token
     const userdata = await User.findByIdAndUpdate(
       { _id: tokenData._id },
       { $set: { password: newPass, token: "" } },
       { new: true }
     );

     // Sending a success response with the updated user data
     res.status(200).send({
       success: true,
       msg: "Password reset successfully",
       data: userdata,
     });
   } else {
     // Sending a success response if the link has expired or the token is invalid
     res.status(200).send({ success: true, msg: "Link Expired or Invalid Token!" });
   }
 } catch (error) {
   // Handling errors and sending an error response if an exception occurs
   res.status(400).send({ success: false, msg: error.message });
 }
};

const isTokenExpired = (timestamp) => {
 const expirationTime = 86400000; 
 const currentTime = new Date().getTime();
 return (currentTime - timestamp) > expirationTime;
};




const orgLogin = async (req, res) => {
  try {
      const { name, password } = req.body;

      // Find user by username
      const org = await Organizations.findOne({ name });   // Doubt syntax coloring not happening

      // Check if user exists
      if (!user) {
          return res.status(404).json({ error: 'Org not found' });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, org.password);
      if (!isPasswordValid) {
          return res.status(401).json({ error: 'Invalid password' });
      }

      // Generate JWT token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

      // Send success response with username and token
      res.status(200).json({ message: 'Org signed in successfully', name: org.name, token });
  } catch (error) {
      console.error('Error during org login:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};


export { userSignup,userLogin,forget_password,reset_password,orgSignup, orgLogin };
