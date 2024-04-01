import Cause from '../model/causes.js';
import Organization from '../model/organization.js';
import jwt from 'jsonwebtoken';

// Controller function for creating a cause and associating it with an organization
const createCause = async (req, res) => {
    try {
        // Extract required data from request body
        const { title, fundsRequired, category, date, descriptionText } = req.body;

        // Extract organization id from the authenticated user's token
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const organizationId = decodedToken.organizationId;

        // Check if the organization exists
        const organization = await Organization.findById(organizationId);
        if (!organization) {
            return res.status(404).json({ error: 'Organization not found' });
        }

        // Create a new cause
        const newCause = new Cause({
            title,
            organization: organizationId,
            fundsRequired,
            category,
            date,
            descriptionText
        });

        // Save the new cause to the database
        await newCause.save();

        res.status(201).json({ message: 'Cause created successfully', cause: newCause });
    } catch (error) {
        console.error('Error during cause creation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export { createCause };
