const express = require('express');
const router = express.Router();
const {emailVerifySchema} = require('../../Validations/validation');
const {checkUserExistsByEmail, verifyEmail} = require('../../RoutesManagement/Authentication_Management/authentication-management');

//Register a User
router.post("/verify-email", async(req, res) => {
    let result = {};
    try {
        let isValidInfo = emailVerifySchema.validate(req.body);
        if(isValidInfo.error) {
            result.validationError = "User Data is not valid";
            res.status(400).send(result);
        }
        else {
           let user = await checkUserExistsByEmail(req.body.email);
           if(user) {
                result = await verifyEmail(req.body);
                if(result.isSuccess) {
                    res.status(200).json(result);
                } else {
                    res.status(498).json(result);
                }    
           }
           else {
            result.data = "User Not Found";
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