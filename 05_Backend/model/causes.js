// This schema is for the causes to be created. Health, finance, etc.
// Constants - will contain enum of category

// Title, Charity name - Fk, funds raised, funds required, number of donors, category (enum), sections (array),
// Date, status: default: pending, descrption text, description image

import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define Cause Schema
const CauseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    // required: truess
  },
  fundsRaised: {
    type: Number,
    default: 0,
  },
  fundsRequired: {
    type: Number,
    required: true,
  },
  numberOfDonors: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    enum: ["Health", "Education", "Environment", "Social", "Other"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "pending",
  },
  descriptionText: {
    type: String,
    required: true,
  },
  descriptionImage: {
    type: String, // This can be the path to the image
  },
});

// Create and export the Cause model
const Cause = mongoose.model("Cause", CauseSchema);
export default Cause;
