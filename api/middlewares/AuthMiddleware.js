const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;

    try {
      if (authHeader) {
        const token = authHeader.split(" ")[1];
  
        jwt.verify(token, JWT_SECRET, (err, user) => {
          if (err) {
            return res.status(403).json({ msg: "Forbidden" });
          }
          req.user = user;
          next();
        });
      } else {
        return res.status(401).json({ msg: "Not authenticated!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal server error" });
    }
}

const isAdmin = (req, res) => {

}

const isSupplier = (req, res) => {

}

const isInstitute = (req, res) => {
    
}

module.exports = {
  verify,
  isAdmin,
  isSupplier,
  isInstitute
}