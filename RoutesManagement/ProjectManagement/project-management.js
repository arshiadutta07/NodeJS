const bcrypt = require("bcrypt");
let userModel = require("../../Models/user");
let projectModel = require('../../Models/project');
const { Op } = require('sequelize');

let getAllUsers = function(pageNo) {
    return new Promise(async function(resolve, reject) {
        try {
            let limit = 5;
            let result = {};
            let res = await userModel.findAll({
                attributes : ["id", "displayName", "userName", "email", "role"],
                limit : limit,
                offset : (pageNo - 1) * limit,
              });
            result.data = res;
            resolve({success: true, data : result});
        }
        catch(ex) {
            reject(ex);
        }
    })
}

let validateProjectManager = function(id) {
    return new Promise(async function(resolve, reject) {
        try {
            let user = await userModel.findOne({
                where: {
                  id, 
                  role: {
                    [Op.or]: ['Admin', 'SuperAdmin'],
                  },
                },
              })
            
              if(user) {
                resolve(true);
              } else {
                resolve(false);
              }
        }
        catch(ex) {
            reject(ex);
        }
    })
}

let validateClient = function(id) {
    return new Promise(async function(resolve, reject) {
        try {
            let user = await userModel.findOne({
                where: {
                  id, 
                  role: 'Client'
                },
              })
            
              if(user) {
                resolve(true);
              } else {
                resolve(false);
              }
        }
        catch(ex) {
            reject(ex);
        }
    })
}

let createPtroject = function(obj) {
    return new Promise(async function(resolve, reject) {
        try {
            let result = {};
            let res = await projectModel.create(obj);
            result.data = res.dataValues;
            resolve(result);
        }
        catch(ex) {
            reject(ex);
        }
    })
}



module.exports = {
    getAllUsers,
    validateProjectManager,
    validateClient,
    createPtroject
}