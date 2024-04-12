import mongoose from "mongoose";

// Charity name - unique, email, password, location
const Schema = mongoose.Schema;

// Define Charity Schema
// 
const OrgSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    contact_no :{
    type:String,
    },
    token:{
        type:String, 
        default:''
      }

});

// Create and export the Charity model
const Organization = mongoose.model('Organization', OrgSchema);
export default Organization;
