const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  try {
    // Get the JWT from the Authorization header
    const token = req.header('Authorization').replace('Bearer ', '');

    // Verify the JWT and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    // Find the user by ID and attach the user object to the request object
    const user = await User.findOne({ _id: userId, 'tokens.token': token });
    if (!user) {
      throw new Error();
    }
    req.user = user;

    // Call the next middleware function
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authMiddleware;
