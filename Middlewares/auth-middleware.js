require('dotenv').config();
const jwt = require('jsonwebtoken');

let auth = function(req, res, next) {
    let result = {};
    try {
        let secretKey = process.env.JWT_SECRET_KEY;
        if(req.headers["cookie"]) {
            let token = req.headers["cookie"].split('=')[1];
            jwt.verify(token, secretKey, function(err, decoded) {
                if (err) {
                    result.error = `Unauthorized User - ${err.message}. Please login again!`;
                    res.status(401).send(result);
                } else {
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

module.exports = auth;