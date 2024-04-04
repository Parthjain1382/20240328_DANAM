import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["admin","donor"],
    default: "donor"
  },
  username: {
    type: String,
    // required: true
    unique:true
  },
  password: {
    type: String,
    // required: true,
    minlength: 8,
  },
  email: {
    type: String,
    // required: true
    unique: true
  },
  phone_number: {
    type: String,
    // required: true
  },
  address: {
    type: String,
    // required: true
  },
  numberOfDonations: {
    type: Number,
    default:0
    // required: false 
  },
  contributionAmmount: {
    type: Number,
    default:0
  },
  token:{
    type:String, 
    default:''
  }
});

const Users = mongoose.model("User", userSchema);
export default Users;