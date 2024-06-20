require('dotenv').config();
const jwt = require('jsonwebtoken');

let auth = function(req, res, next) {
    let result = {};
    try {
        let secretKey = process.env.JWT_SECRET_KEY;
        console.log(secretKey)
        if(req.headers["cookie"]) {
            let token = req.headers["cookie"].split('=')[1];
            token = token.split(';')[0];
            jwt.verify(token, secretKey, function(err, decoded) {
                if (err) {
                    result.error = `Unauthorized User - ${err.message}. Please login again!`;
                    res.status(401).send(result);
                } else {
                    req.scope = { role: decoded.role };
                    next();
                }
            });  
        }
        else {
            result.error = "Sorry, we couldn\'t retrieve the authentication token. Please login again.";
            res.status(401).send(result);
        }
    }
    catch(ex) {
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
}

let authorizeRoles = function(allowedRoles) {
    return (req, res, next) => {
        const userRole = req.scope ? req.scope.role : null; 
  
      if (allowedRoles.includes(userRole)) {
        return next();
      }
  
      res.status(403).json({ message: "You Don't have permission to access this resource" });
    };
  }

module.exports = {
    auth,
    authorizeRoles
}