const jwt = require('jsonwebtoken');

module.exports = {
  authenticate: (req, res, next) => {
    const header = req.headers['authorization'];
    if (!header) return res.status(401).json({error: 'No token provided'});
    const token = header.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({error: 'Invalid token'});

      req.user = decoded; // { userId, thegroups: ['application', ...] }
      next();
    });
  },

  authorizeGroups: (allowedGroups) => {
    return (req, res, next) => {
      if (!req.user) return res.status(401).json({error: 'Unauthorized'});
      const userGroups = req.user.groups || [];
      const hasAccess = userGroups.some(g => allowedGroups.includes(g));
      if (!hasAccess) {
        return res.status(403).json({error: 'Forbidden: insufficient privileges'});
      }
      next();
    }
  }
};
