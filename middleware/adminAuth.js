 function checkAdmin(req, res, next) {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(403).send('You must be an admin to perform this operation');
    }
  }

  module.exports = { checkAdmin };