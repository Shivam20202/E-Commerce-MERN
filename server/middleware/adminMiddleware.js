const User = require('../models/User');

const adminMiddleware = async (req, res, next) => {
  const userId = req.user;
  const user = await User.findById(userId);
  if (user?.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
};

module.exports = adminMiddleware;
