
import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define Donation Schema
const DonationSchema = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    Donor: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true
  },
    amount: {
        type: Number,
        required: true
    },
    causeTitle: {
        type: String,
        required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    cause_Id:{
        type:Schema.Types.ObjectId,
        ref:causes
    }
    // sections: [{
    //     type: String
    // }]
  
});

// Create and export the Donation model
const Donation = mongoose.model('Donation', DonationSchema);
export default Donation
