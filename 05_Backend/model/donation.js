
const mongoose = require('mongoose');
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
    // sections: [{
    //     type: String
    // }]
  
});

// Create and export the Donation model
const Donation = mongoose.model('Donation', DonationSchema);
module.exports = Donation