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

let createProject = function(obj) {
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

let updateProject = function(obj, id) {
  return new Promise(async function(resolve, reject) {
      try {
          let result = {};
          await projectModel.update(obj, {where: {id} });
          result.data = "User Updated Successfully";
          resolve(result);
      }
      catch(ex) {
          reject(ex);
      }
  })
}

let getAllProjects = function(pageNo) {
  return new Promise(async function(resolve, reject) {
      try {
          let limit = 5;
          let result = {};
          let res = await projectModel.findAll({
              attributes : ["id", "name", "description", "status"],
              limit : limit,
              offset : (pageNo - 1) * limit,
              include  : [
                { model: userModel, attributes: ["displayName", "userName", "role"], as : "projectManager"},
                { model: userModel, attributes: ["displayName", "userName", "role"], as : "client"}
              ]
            });
          result.data = res;
          resolve({success: true, data : result});
      }
      catch(ex) {
          reject(ex);
      }
  })
}

let getParticularProject = function(id) {
  return new Promise(async function(resolve, reject) {
      try {
          let limit = 5;
          let result = {};
          let res = await projectModel.findOne({
              attributes : ["id", "name", "description", "status"],
              include  : [
                { model: userModel, attributes: ["displayName", "userName", "role"], as : "projectManager"},
                { model: userModel, attributes: ["displayName", "userName", "role"], as : "client"}
              ],
              where : {id}
            });
          result.data = res;
          resolve({success: true, data : result});
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
    createProject,
    updateProject,
    getAllProjects,
    getParticularProject
}