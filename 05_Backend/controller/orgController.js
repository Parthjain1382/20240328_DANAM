
import Cause from "../model/causes.js";
import Organization from "../model/organization.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import randomstring from "randomstring";
import config from "../config/config.js";

// Controller function for creating a cause and associating it with an organization
const createCause = async (req, res) => {
  try {
    // Token is of the format Bearer `token` in the headers
    const token = req.headers.authorization?.split(" ")[1];

    // Verify and decode the token to extract user ID
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    const userId = decoded._id;
    console.log(userId);
    // Fetch user data from the database based on the user ID
    const user = await Organization.findById(userId);
    console.log(user);
    const { name, fundsRequired, category, descriptionText, descriptionImage } =
      req.body;
    const causeDetails = {
      organization: userId,
      title: name,
      fundsRequired: fundsRequired,
      category: category,
      descriptionText: descriptionText,
      descriptionImage: descriptionImage,
    };
    const cause = new Cause(causeDetails);
    await cause.save();
    res.status(201).json(cause);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const forget_org_password = async (req, res) => {
  try {
    // Extracting the email from the request body
    const email = req.body.email;
    
    // Finding user data based on the provided email
    const orgData = await Organization.findOne({ email: email }, { username: 1, email: 1 });

    // If user data is found
    if (orgData) {
      // Generating a random string
      const randomString = randomstring.generate();
      
      // Updating the user's record with the generated token
      const data = await Organization.updateOne(
        { email: email },
        { $set: { token: randomString } }
      );

    

      // Sending the reset password email
      sendResetPasswordMail(orgData.username, orgData.email, randomString);

      // Sending a success response
      res.status(200).send({ success: true, msg: "Check mail and reset password!" });
    } else {
      // Sending a success response if email does not exist
      res.status(200).send({ success: true, msg: "Email does not exist" });
    }
  } catch (error) {
    // Handling errors and sending an error response if an exception occurs
    res.status(400).send({ success: false, msg: error.message });
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
        user: config.emailUser, // Your Gmail username
        pass: config.emailPassword, // Your Gmail password
      },
      tls: {
        ciphers: "SSLv3",
      },
    });

    // Mail options for the reset password email
    const mailOptions = {
      from: config.emailUser, // Sender's email address
      to: email, // Recipient's email address
      subject: "For reset password", // Email subject
      // Email body in HTML format
      html: `
       <p>Hi ${name},</p>
       <p>Please click the link below to reset your password:</p>
       <a href=http://localhost:4200/resetorgpassword?token=${token}>Reset password</a>
     `,
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
const reset_org_password = async (req, res) => {
  try {
    // Extracting the token from the query parameters
    const token = req.query.token;
    console.log(token);

    // Finding user data based on the provided token
    const tokenData = await Organization.findOne({ token: token });
    console.log(tokenData);

    // If token data is found and it's not expired
    if (tokenData && !isTokenExpired(tokenData.tokenTimestamp)) {
      // Extracting the new password from the request body
      const password = req.body.password;

      // Hashing the new password using bcrypt
      const newPass = await bcrypt.hash(password, 10);

      // Updating the user's record with the new password and clearing the token
      const orgdata = await Organization.findByIdAndUpdate(
        { _id: tokenData._id },
        { $set: { password: newPass, token: "" } },
        { new: true }
      );

      // Sending a success response with the updated user data
      res.status(200).send({
        success: true,
        msg: "Password reset successfully",
        data: orgdata,
      });
    } else {
      // Sending a success response if the link has expired or the token is invalid
      res
        .status(200)
        .send({ success: true, msg: "Link Expired or Invalid Token!" });
    }
  } catch (error) {
    // Handling errors and sending an error response if an exception occurs
    res.status(400).send({ success: false, msg: error.message });
  }
};

export { createCause, reset_org_password,forget_org_password };
