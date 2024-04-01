import Cause from "../model/causes.js";


/**
 * API to get all the causes based on status pending
 */
const getAllPendingCauses = async (req, res) => {
  
  let stat = req.query.status
  
  try {
    const allCauses = await Cause.find({ status: stat });
    res.json(allCauses);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal server error');
  }
}

export default getAllPendingCauses

