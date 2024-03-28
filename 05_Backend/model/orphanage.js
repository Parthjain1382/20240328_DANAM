import mongoose from "mongoose";

const OrphanageSchema = new mongoose.Schema({
  orphanageName: {
    type: String,
    maxLength: 20,
    required: true
  },
  orphanageEmail: {
    type: String,
    maxLength: 25,
    required: true
  },
  // password: {
  //   type: String,
  //   required: true,
  //   minlength: 8,
  //   maxlength: 20,
  // },
  address: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  contactInfo: {
    type: String,
    required: true,
    minLength: 12,
    validate: {
      validator: function (value) {
        //  Basic email validation
        return /^\+\d{1,4}\d{10}$/.test(value);
      },
      message: "Invalid Phone Number",
    },
  },
  needs: {
    beds: {
      type: Number,
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
  imageUrl: {
    type: String,
    required: true
  },
  DateofPost: {
    type: Date,
    required: false,
    default: Date.now()
  }
})


const Orphanage = mongoose.model("Orphanage", OrphanageSchema);
export default Orphanage;