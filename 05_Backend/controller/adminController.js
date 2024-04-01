import Cause from "../model/causes.js";


/**
 * API to get all the causes based on status pending
 */
const getAllPendingCauses = async (req, res) => {
  
  let stat = req.query.status
  try {
    const allCauses = await Cause.find({ status: 'pending' })
    .populate({
      path: 'organization',
      select: 'name' 
    })
    .exec();
  
  console.log(allCauses);
    res.json(allCauses);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal server error');
  }
}



const updateCauseStatus = async (req, res) => {
  const { title, status } = req.body;
  try {
    // Find the cause by its title
    const foundCause = await Cause.findOne({ title: title });
    
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
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal server error');
  }
};



const deleteCause = async (req, res) => {
  const { title } = req.params;
  try {
    // Find the cause by its title and delete it
    const deletedCause = await Cause.findOneAndDelete({ title: title });
    
    // If cause not found, return 404
    if (!deletedCause) {
      return res.status(404).json({ message: "Cause not found" });
    }

    // Return the deleted cause
    res.json(deletedCause);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal server error');
  }
};


export default {
  getAllPendingCauses,
  updateCauseStatus,
  deleteCause
}