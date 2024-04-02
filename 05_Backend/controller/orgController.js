import Cause from '../model/causes.js';
import Organization from '../model/organization.js';
import jwt from 'jsonwebtoken';

// Controller function for creating a cause and associating it with an organization
// const createCause = async (req, res) => {
//     try {
//         // Extract required data from request body
//         const { title, fundsRequired, category, date, descriptionText } = req.body;

//         // Extract organization id from the authenticated user's token
//         const token = req.headers.authorization;
//         const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
//         const organizationId = decodedToken.organizationId;

//         // Check if the organization exists
//         const organization = await Organization.findById(organizationId);
//         if (!organization) {
//             return res.status(404).json({ error: 'Organization not found' });
//         }

//         // Create a new cause
//         const newCause = new Cause({
//             title,
//             organization: organizationId,
//             fundsRequired,
//             category,
//             descriptionText
//         });

//         // Save the new cause to the database
//         await newCause.save();

//         res.status(201).json({ message: 'Cause created successfully', cause: newCause });
//     } catch (error) {
//         console.error('Error during cause creation:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };


const createCause = async (req, res) => {
    try {
    // Token is of the format Bearer `token` in the headers
  const token = req.headers.authorization?.split(" ")[1];
    
    // Verify and decode the token to extract user ID
    const decoded = jwt.verify(token,  process.env.SECRET_KEY);
    console.log(decoded);
    const userId = decoded._id;
    console.log(userId)
    // Fetch user data from the database based on the user ID
    const user = await Organization.findById(userId);
    console.log(user)
      const { name, fundsRequired, category, descriptionText,descriptionImage} = req.body;
      const causeDetails = {
        // organization: req.organization._id,
        title: name,
        fundsRequired: fundsRequired,
        category: category,
        descriptionText: descriptionText,
        descriptionImage: descriptionImage
      };
      const cause = new Cause(causeDetails);
      await cause.save();
      res.status(201).json(cause);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  };

export { createCause };
