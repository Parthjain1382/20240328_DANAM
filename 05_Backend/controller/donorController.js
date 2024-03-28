
// Importing internal dependencies (Model, Validators)
import requireLogin from "../middleware/requireLogin.js";
import Orphanage from "../model/orphanage.js"
import inventory from "../model/Inventory.js";
import Donation from "../model/donation.js";


/**To Get the List of all Donors
 * */  
const donorList=async (req, res) => {
  try {
    //Finding the role==="CompanyUser"
    const companyUsers = await User.find({ role: 'CompanyUser' });
    // Return the list of company users
    res.json(companyUsers);
  } catch (error) {
    console.error('Error fetching company users:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**The Function to donate the orphanage 
 * 
 */
const donate = (requireLogin,async (req, res) => {
  try {
    // Extracting user data from request body
    const { user } = req;
    console.log(user);

    // Donation to orphanage by Donor
    const { orphanageId, beds, mensClothes, femaleClothes } = req.body;

    // Condition for checking the number of beds and clothes
    if (beds <= 0 || mensClothes <= 0 || femaleClothes <= 0) {
      return res.status(400).json({ error: 'Invalid number of beds or clothes' });
    }

    // Find the orphanage by ID
    const orphanage = await Orphanage.findById(orphanageId);
    if (!orphanage) {
      return res.status(404).json({ error: 'Orphanage not found' });
    }

    // Getting the remaining Beds, clothes for mens and females when subtracted from orphanage needs
    const remainingBeds = beds - orphanage.needs.beds;
    const remainingClothesMen = mensClothes - orphanage.needs.clothes.mens;
    const remainingClothesWomen = femaleClothes - orphanage.needs.clothes.female;

    // If the beds and clothes donated is greater or equal to Needs 
    if (remainingBeds > 0 && remainingClothesMen > 0 && remainingClothesWomen > 0) {
      // Creating a new inventory item
      const inventoryItem = new inventory({
        donorid: user._id,
        extras: {
          beds: remainingBeds,
          clothes: {
            mens: remainingClothesMen,
            female: remainingClothesWomen
          }
        }
      });
      // Adding the new inventory Item
      await inventoryItem.save();

      // Creating a new Donation object in the donation collection
      const newDonation = new Donation({
        orphanageId: orphanageId,
        donorID: user._id,
        donerThings: {
          beds: beds,
          clothes: {
            mens: mensClothes,
            female: femaleClothes
          }
        },
        date: new Date()
      });

      // Saving the donation to the database
      await newDonation.save();

      // Send success response
      return res.status(200).json({ message: 'Donation successful', Donation: newDonation });
    } else {
      // Find an existing inventory item that can be used
      const existingInventoryItem = await inventory.findOne({
        'extras.beds': { $gte: Math.abs(remainingBeds) },
        'extras.clothes.mens': { $gte: Math.abs(remainingClothesMen) },
        'extras.clothes.female': { $gte: Math.abs(remainingClothesWomen) }
      });

      console.log(existingInventoryItem);

      // Use the existing inventory item
      if (existingInventoryItem) {
        // Update the existing inventory item with the remaining items after the donation
        existingInventoryItem.donorid = user._id;
        existingInventoryItem.extras.beds -= Math.abs(remainingBeds);
        existingInventoryItem.extras.clothes.mens -= Math.abs(remainingClothesMen);
        existingInventoryItem.extras.clothes.female -= Math.abs(remainingClothesWomen);
       
        //Adding the extra Item to the Inventory
        await existingInventoryItem.save();

        // Creating a new Donation object in the donation collection
        const newDonation = new Donation({
          orphanageId: orphanageId,
          donorID: user._id,
          donerThings: {
            beds: beds,
            clothes: {
              mens: mensClothes,
              female: femaleClothes
            }
          },
          date: new Date()
        });

        // Saving the donation to the database
        await newDonation.save();

        return res.status(200).json({ message: 'Donation successful', Donation: newDonation });
      } else {
        console.log('Not enough items available in the inventory.');
        return res.status(400).json({ error: 'Not enough items available in the inventory' });
      }
    }
  } catch (error) {
    console.error('Error making donation:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


export default{
  donorList,
  donate
}
