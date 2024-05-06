// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      // User is an admin, proceed to the next middleware or route handler
      next();
    } else {
      // User is not authorized, send a 403 Forbidden response
      res.status(403).json({ message: 'Unauthorized' });
    }
  };
// Middleware to check if the user is an super admin
const isSuperAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'superadmin') {
      // User is an admin, proceed to the next middleware or route handler
      next();
    } else {
      // User is not authorized, send a 403 Forbidden response
      res.status(403).json({ message: 'Unauthorized' });
    }
  };
  
  // Middleware to check if the user is a client
  const isClient = (req, res, next) => {
    if (req.user && req.user.role === 'client') {
      // User is a client, proceed to the next middleware or route handler
      next();
    } else {
      // User is not authorized, send a 403 Forbidden response
      res.status(403).json({ message: 'Unauthorized' });
    }
  };
  
  // Middleware to check if the user is an agency
  const isAgency = (req, res, next) => {
    if (req.user && req.user.role === 'agency') {
      // User is an agency, proceed to the next middleware or route handler
      next();
    } else {
      // User is not authorized, send a 403 Forbidden response
      res.status(403).json({ message: 'Unauthorized' });
    }
  };


module.exports = { isAdmin, isSuperAdmin, isClient, isAgency }