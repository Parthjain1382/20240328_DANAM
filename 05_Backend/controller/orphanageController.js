// Importing external dependencies
import 'dotenv/config';

// Importing internal dependencies (Model, Validators)
import Orphanage from "../model/orphanage.js"
import requireLogin  from '../middleware/requireLogin.js';
const orphanageList =async (req, res) => {
  try {
    // Get the current date
    const currentDate = new Date();
    // Find the orphanages whose dates are closest to today's date
    const orphanages = await Orphanage.find().sort({ DateofPost: 1 }).limit(3); // Limit the results to 3 orphanages

    // Return the closest orphanages
    res.json(orphanages);
  } catch (error) {
    console.error('Error fetching closest orphanages:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addNewOrphanage = (requireLogin, async (req, res) => {
  const user = req.user

  if (user.role != "admin") {
    return res.status(401).send({ error: "You are not an Admin" });
  }

  try {
    // Extract data from the request body
    const {
      orphanageName,
      orphanageEmail,
      address,
      description,
      contactInfo,
      imageUrl,
      needs: { beds, clothes: { mens, female } }
    } = req.body;

    // Create a new orphanage object using the Orphanage model
    const newOrphanage = new Orphanage({
      orphanageName,
      orphanageEmail,
      address,
      description,
      contactInfo,
      needs: {
        beds,
        clothes: { mens, female }
      },
      imageUrl
    });

    // Save the new orphanage to the database
    const savedOrphanage = await newOrphanage.save();
    // Return a success response with the saved orphanage data
    return res.status(201).json(savedOrphanage);
  } catch (error) {
    // Handle errors
    console.error("Error adding new orphanage:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


export default{
 orphanageList,
 addNewOrphanage
}