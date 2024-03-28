import mongoose from "mongoose";
import Orphanage from "./orphanage.js";
import User from "./Users.js";

const donationSchema = new mongoose.Schema({
  orphanageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Orphanage,
    required:true
  },
  donorID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:User,
    required:true
  },
  donerThings:{
    beds: {
      type:Number,
      required: true 
      
    },
    clothes: {
     mens:{
      type:Number,
      required:true,
      default:0
     },
     female:{
      type:Number,
      required:true,
      default:0
     }
    },
  },
  // status:{
  //   type:String,
  //   required:true
  // },
  date:{
    type:Date,
    required:false
    
  }
});

const Donation = mongoose.model("Donation", donationSchema);
export default Donation;
