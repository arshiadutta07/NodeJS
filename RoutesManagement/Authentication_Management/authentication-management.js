const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
let userModel = require("../../Models/user");
let emailVerificationModel = require('../../Models/emailVerificationDetails');
const randomToken = require('random-token');
require('dotenv').config();

//SignUp Management Functions
let checkUserExists = function(userName) {
    return new Promise(async function(resolve, reject) {
        try {
            let res = await userModel.findOne({where: { userName }});
            if(res) {
                resolve(res);
            }
            else {
                resolve(res);
            }
        }
        catch(ex) {
            reject(ex);
        }
    })
}

let createNewUser = function(user) {
    return new Promise(async function(resolve, reject) {
        try {
            let pass = await hashPassword(user.password);
            user.password = pass;
            delete user.repeatPassword;
            let result = await userModel.create(user);
            resolve({success: true, data : result});
        }
        catch(ex) {
            reject(ex);
        }
    })
}

function hashPassword(pass) {
    return new Promise(async function(resolve, reject) {
        try {
            let result = await bcrypt.hash(pass, 10);
            resolve(result);   
        }
        catch(ex) {
            reject(ex);
        }
    })
}

//Login Management Functions
let checkUserPassword = function(userPass, hashPass) {
    return new Promise(async function(resolve, reject) {
        try {
            let result = await bcrypt.compare(userPass, hashPass);
            resolve(result); 
        }
        catch(ex) {
            reject(ex);
        }
    })
}

//Generate Token 
let generateToken = function(user) {
    try {
        let secretKey = process.env.JWT_SECRET_KEY;
        let userInfo = {
            id : user.id,
            username : user.userName,
            role : user.role
        }
        let token = jwt.sign(userInfo, secretKey, { expiresIn: '15m' });
        return token;
    }
    catch(ex) {
        throw new Error("Error in Generating Token");
    }
}

//Register OAuth User
let registerOauthUser = function(oauthUser) {
    return new Promise(async function(resolve, reject) {
        try {
            let user = await userModel.findOne({where: { email : oauthUser.email }});
            if(!user) {
                let userDetails = {
                    displayName : oauthUser.Name,
                    userName : "OAUTH USER",
                    password : "NA",
                    email : oauthUser.email,
                    role : "Client"
                    // googleId : user.id
                }
                await userModel.create(userDetails);
            }
            resolve();
        }
        catch(ex) {
            reject(ex);
        }
    })
}

// Generate Verification Token
let generateEmailVerificationDetails = function(obj) {
    return new Promise(async function(resolve, reject) {
        try {
            let randomEmailToken = randomToken(16);
            let details = {
                user_id : obj.id,
                email : obj.email,
                token : randomEmailToken
            }
            await emailVerificationModel.create(details);
            resolve(randomEmailToken);
        }
        catch(ex) {
            reject(ex);
        }
    })
}

let checkUserExistsByEmail = function(email) {
    return new Promise(async function(resolve, reject) {
        try {
            let res = await userModel.findOne({where: { email }});
            if(res) {
                resolve(res);
            }
            else {
                resolve(res);
            }
        }
        catch(ex) {
            reject(ex);
        }
    })
}

let verifyEmail = function(object) {
    return new Promise(async function(resolve, reject) {
        try {
            let result = {};
            let res = await emailVerificationModel.findOne({where: { email: object.email }});
            if(res.token == object.token) {
                res.update({verificationStatus: true, where:{email: object.email}});
                result.message = "Email Verified Successfully";
                result.isSuccess = true;
                resolve(result);
            } else {
                result.message = "Invalid Token";
                result.isSuccess = false;
                resolve(result);
            }
        }
        catch(ex) {
            reject(ex);
        }
    })
}

module.exports = {
    checkUserExists,
    createNewUser,
    checkUserPassword,
    generateToken,
    registerOauthUser,
    generateEmailVerificationDetails,
    checkUserExistsByEmail,
    verifyEmail
}