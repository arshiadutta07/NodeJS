const express = require('express');
const router = express.Router();
const cookie = require('cookie');
const {userCredentials} = require('../../Validations/validation');
const passport = require('passport');
const {checkUserExists, checkUserPassword, generateToken} = require('../../RoutesManagement/Authentication_Management/authentication-management');

//Authenticating User
router.post("/login", async(req, res) => {
    let result = {};
    try {
        let isValidInfo = userCredentials.validate(req.body);
        if(isValidInfo.error) {
            result.validationError = "User Credentials is not valid";
            res.status(400).send(result);
        }
        else {
           let user = await checkUserExists(req.body.userName);
           if(user) {
                let isPasswordCorrect = await checkUserPassword(req.body.password, user.password);
                if(isPasswordCorrect) {
                    let token = generateToken(user);
                    result.data = {id : user.id, message : "User Authenticated!"};
                    res.setHeader('Set-Cookie', cookie.serialize('Authorization', token, {
                        httpOnly: true,
                        maxAge: 900000,
                        sameSite: 'strict',
                        path: '/',
                      })).status(200).send(result);
                }
                else {
                    result.data = "Incorrect Password";
                    res.status(400).send(result);
                }
           }
           else {
                result.data = "User Doesn't Exists";
                res.status(404).send(result);
           }
        }
    }
    catch(ex) {
        console.log(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
})
    

module.exports = router;