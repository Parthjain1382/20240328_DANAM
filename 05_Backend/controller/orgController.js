import Cause from '../model/causes.js';
import Organization from '../model/organization.js'

const createCause = async (req, res) => {
    try {
        const { title, fundsRequired, category, date, descriptionText } = req.body;

        // Check if the organization exists and is authenticated
        if (!req.user || !req.user.organizationId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Retrieve organization from the database
        const organization = await Organization.findById(req.user.organizationId);
        if (!organization) {
            return res.status(404).json({ error: 'Organization not found' });
        }

        // Create a new cause
        const newCause = new Cause({
            title,
            organization: organization._id,
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
