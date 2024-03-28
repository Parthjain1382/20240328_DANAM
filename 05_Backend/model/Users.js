import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["admin","CompanyUser"],
    default: "CompanyUser"
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  email: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  // Fields specific to company users
  companyName: {
    type: String,
    required: true // Company name is always required
  },
  companyEmail: {
    type: String,
    required: true,// Company email is always required
    default:"none"
  },
  numberOfDonations: {
    type: Number,
    required: false 
  }
});

const Users = mongoose.model("User", userSchema);
export default Users;
