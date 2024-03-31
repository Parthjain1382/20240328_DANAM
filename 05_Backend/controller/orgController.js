const Org = require('../model/organization');

/**
 * API to get all the causes
 */
const organizationProfile = async (req, res) => {
  const orgName = req.params.name

  try {
    const org = await Org.findOne({ name: orgName });

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