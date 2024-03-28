import mongoose from "mongoose";
import Users from "./Users.js";

//Creating the schema
const inventorySchema=new mongoose.Schema({
  donorid:{
    type:mongoose.Schema.Types.ObjectId,  
    ref:Users,
  },
  extras:{
    beds:{
      type:Number,
      required:true,
    },
    clothes: {
      mens:{
        type:Number,
        required:true,

       },
       female:{
        type:Number,
        required:true,
  
       }
    },
  },
})

//exporting the schema
const inventory=mongoose.model("inventory",inventorySchema)
export default inventory