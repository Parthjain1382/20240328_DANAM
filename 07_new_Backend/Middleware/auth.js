const jwt = require('jsonwebtoken');
const User = require('../models/user_schema');
/**
 * Middleware function to verify the JWT token in an incoming request.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next function to call if the token is valid.
 *
 * @throws {import('jsonwebtoken').VerifyErrors} - If the token is invalid or there's an error verifying it.
 * @returns {void}
 */
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: No token provided',
    });
  }
  const extractedToken = token.replace("Bearer ","")
  jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error(err);
      // Handle unauthorized error
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Invalid token',
      });
    }
  
    req.decoded = decoded;
    next();
  });
};

module.exports = { verifyToken };
