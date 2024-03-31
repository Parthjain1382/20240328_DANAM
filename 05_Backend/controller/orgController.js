// const Org = require('../model/organization');
import Organizations from '../model/organization.js';

/**
 * API to get all the causes
 */
const organizationProfile = async (req, res) => {
  const orgName = req.params.name

  try {
    const org = await Organizations.findOne({ name: orgName });

    if (!org) {
      return res.status(404).json({ msg: 'Organization not found' });
    }
    res.json(org);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal server error');
  }
}

export {
  organizationProfile
}