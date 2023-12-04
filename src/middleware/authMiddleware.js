const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Missing token' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), 'avinashassignments');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

module.exports = authMiddleware;
