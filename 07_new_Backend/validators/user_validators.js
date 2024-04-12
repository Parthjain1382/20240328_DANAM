
/**
 * Validates the provided user data according to specific criteria.
 *
 * @param {Object} userData - The user data to be validated.
 * @param {string} userData.username - The username.
 * @param {string} [userData.email] - The user's email address (optional).
 * @param {string} [userData.phone_number] - The user's phone number (optional).
 * @param {string} userData.password - The user's password.
 *
 * @returns {string|null} - A string describing the validation error if any, or null if validation passes.
 */
const validateInputs = (userData) => {
    const { username, email, password } = userData;
  
    // Validate username
    if (!username || typeof username !== 'string' || username.length < 3) {
      return 'Username must be a string with at least 3 characters.';
    }
  
    // Validate email
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return 'Please provide a valid email address.';
      }
    }
  
    //  Validate phone number
    // if (phone_number) {
    //   const phoneRegex = /^[0-9]{10}$/;
    //   if (!phoneRegex.test(phone_number)) {
    //     return 'Please provide a valid 10-digit phone number.';
    //   }
    // }
  
    // Validate password
    if (!password || typeof password !== 'string' || password.length < 6) {
      return 'Password must be a string with at least 6 characters.';
    }
  
    // TODO : Password  strength validation
    // const passwordComplexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    // if (!passwordComplexityRegex.test(password)) {
    //   return 'Password must include at least one uppercase letter, one lowercase letter, and one digit.';
    // }
  
    // No validation errors
    return null;
  };
  
  module.exports = { validateInputs };
  