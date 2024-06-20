const express = require('express');
const router = express.Router();
const {auth, authorizeRoles} = require("../../Middlewares/auth-middleware");
const {getAllUsers, validateProjectManager, validateClient, createProject, updateProject, getAllProjects, getParticularProject} = require('../../RoutesManagement/ProjectManagement/project-management');

//Get All Users
router.get("/users", auth, authorizeRoles(['SuperAdmin']), async(req, res) => {
    let result = {};
    try {
        let users = await getAllUsers(req.query.page);
        result.data = users.data;
        res.status(200).send(result);
    }
    catch(ex) {
        console.log(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
})

router.post("/projects", auth, authorizeRoles(['SuperAdmin', 'Admin']), async(req, res) => {
    let result = {};
    try {
        let isManager = await validateProjectManager(req.body.project_manager_id);
        let isClient = await validateClient(req.body.client_id);

        if(isManager && isClient) {
            let obj = await createProject(req.body);
            result.data = obj.data;
            res.status(200).send(result);
        } else {
            result.data = "Invalid Input";
            res.status(400).send(result);
        }
    }
    catch(ex) {
        console.log(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
})

router.put("/projects/:id", auth, authorizeRoles(['SuperAdmin', 'Admin']), async(req, res) => {
    let result = {};
    try {
            let id = req.params.id;
            let resp = await updateProject(req.body, id);
            result.data = resp.data;
            res.status(200).send(result);
    }
    catch(ex) {
        console.log(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
})

router.get("/projects", auth, authorizeRoles(['SuperAdmin']), async(req, res) => {
    let result = {};
    try {
        let projects = await getAllProjects(req.query.page);
        result.data = projects.data;
        res.status(200).send(result);
    }
    catch(ex) {
        console.log(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
})


router.get("/projects/:id", auth, async(req, res) => {
    let result = {};
    try {
        let project = await getParticularProject(req.params.id);
        result.data = project.data;
        res.status(200).send(result);
    }
    catch(ex) {
        console.log(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
})

module.exports = router;