//importing nesscary models
import Cause from "../model/causes.js";
import donation from "../model/donation.js";
import organization from "../model/organization.js"
import Users from "../model/Users.js";

/** API to get all the causes based on status pending 
 * @param {*} req 
 * @param {*} res 
 */
const getAllPendingCauses = async (req, res) => {
  //Getting the user credential from Middleware
  const user=req.user

  //getting the user's data
  const userdata=await Users.findById(user._id)
  console.log(userdata.role);

  if(userdata.role!=="admin"){
    res.status(404).json('User is not Admin')
  }

  let stat = req.query.status
  try {
    const allCauses = await Cause.find({ status: 'pending' })
    .populate({
      path: 'organization',
      select: 'name' 
    })
    .exec();
  
  // console.log(allCauses);
    res.json(allCauses);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal server error');
  }
}


/**This is the function when the admin accepts a specific cause by a charity
 * @param {*} req  
 * @param {*} res 
 * @returns  The new object where the status is updated 
 */
const updateCauseStatus = async (req, res) => {
  //Getting the user credential from Middleware
  const user=req.user

  //getting the user's data
  const userdata=await Users.findById(user._id)
  console.log(userdata.role);

  if(userdata.role!=="admin"){
    res.status(404).json('User is not Admin')
  }
  const { id, status } = req.body;
  try {
    // Find the cause by its title
    const foundCause = await Cause.findOne({ _id: id });
    
    // If cause not found, return 404
    if (!foundCause) {
      return res.status(404).json({ message: "Cause not found" });
    }

    // Update the status of the found cause
    foundCause.status = status;
    
    // Save the updated cause
    await foundCause.save();
    
    // Return the updated cause
    res.json(foundCause);
  } 
  catch (err) {
    console.log(err.message);
    res.status(500).send('Internal server error');
  }
};


/**This is the api call to delete the cause by the Admin
 * @param {*} req 
 * @param {*} res 
 * @returns deleteCause the cause that is deleted
 */
const deleteCause = async (req, res) => {
  //Getting the user credential from Middleware
  const user=req.user

  //getting the user's data
  const userdata=await Users.findById(user._id)
  console.log(userdata.role);

  if(userdata.role!=="admin"){
    res.status(404).json('User is not Admin')
  }
  
  const  id = req.body.id;
  try {
    // If cause not found, return 404
    const cause=await Cause.findOne({_id: id});
  
    //if cause is not present in the database
    if (!cause) {
      return res.status(404).json({ message: "Cause not found" });
    }
    // Find the cause by its title and delete it
    const deletedCause = await Cause.findByIdAndDelete({ _id: id });
    // Return the deleted cause
    res.json(Cause);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal server error');
  }
};

/**This is function to get the details of all the organization in the database
 * @param {*} req 
 * @param {*} res 
 */
const orgDetails=async(req,res)=>{
//Getting the user credential from Middleware
const user=req.user

//getting the user's data
const userdata=await Users.findById(user._id)
console.log(userdata.role);

if(userdata.role!=="admin"){
  res.status(404).json('User is not Admin')
}

  try {
    const documents = await organization.find();
    console.log(documents);
    // This will be an array of all documents in the Organization collection
    res.status(200).json(documents); 
  } 
  catch (err) {
    console.error('Error retrieving documents:', err);
  }
}


/**This function is responsible for getting the donation List 
 * 
 */
const donationList=async(req,res)=>{

//Getting the user credential from Middleware
const user=req.user

//getting the user's data
const userdata=await Users.findById(user._id)
console.log(userdata.role);

if(userdata.role!=="admin"){
  res.status(404).json('User is not Admin')
}
  
try{
    const documents = await donation.find();
    console.log(documents);
    // This will be an array of all documents in the Organization collection
    res.status(200).json(documents); 
  } 
  catch (err) {
    console.error('Error retrieving documents:', err);
  }
}


export default {
  getAllPendingCauses,
  updateCauseStatus,
  deleteCause,
  orgDetails,
  donationList
  
}