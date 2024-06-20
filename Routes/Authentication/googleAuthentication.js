const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../../Middlewares/google-oauth');
const {registerOauthUser} = require('../../RoutesManagement/Authentication_Management/authentication-management');


router.get('/google',
    passport.authenticate('google', { scope:
        [ 'email', 'profile' ] }
));
  
router.get('/google/callback',
        passport.authenticate( 'google', {
          successRedirect: '/auth/google/success',
          failureRedirect: '/auth/google/failure'
}));

//Success
router.get('/google/success' , async (req,res) => {
        await registerOauthUser(req.user);
        res.status(200).send("User Authenticated Successfully");
}); 
    
// Failure 
router.get('/google/failure' , (req,res) => {
    res.send(500).json({ error: 'Internal server error' });
});

module.exports = router;