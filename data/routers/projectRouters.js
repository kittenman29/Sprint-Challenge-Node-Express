const express = require('express');

const Projects = require('../helpers/projectModel.js');

const router = express.Router();

// Get all projects
router.get('/', (req, res) => {
    Projects.get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json({message: 'Encountered an error retrieving the projects'})
    })
});

// Get projects by ID
router.get('/:id', async (req, res) => {
    const project = await Projects.get(req.params.id);
    console.log(req.params.id);
    try {
        if(project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: "The project you are looking for doesn't exist" });
        }
    }
    catch {
        res.status(500).json({ error: "The project information could not be retrieved" });
    }
})

// // Get project actions
// router.get('/:id/actions/:projectid', async (req, res) => {
//     const project = await Projects.get(req.params.id);
//     const projectId = await Projects.getProjectActions(req.params.actions.project_id);
//     console.log(req.params.id);
//     console.log(req.params.actions.project_id);
//     try {
//         if(req.params.actions !== null) {
//             res.status(200).json(project_id);
//         } else {
//             res.status(404).json({ message: "The project actions you are looking for don't exist" });
//         }
//     }
//     catch {
//         res.status(500).json({ error: "The project actions could not be retrieved" });
//     }
// })

// Add new project
router.post('/newproject', async (req, res) => {
    const project = req.body;
    console.log(project);
    try {
        if (!project) {
            res.status(400).json({error: 'You are missing a description, or name' })
        }
        console.log(project);
        Projects.insert(project)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(error => {
            res.status(500).json({error: "There was an error adding a new project" })
        })
    }
    catch(error) {
        console.log(error);
        res.status(500).json({error: "you fucked up somewhere along the line" })
    }
})

// Delete actions by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.params.id);
    Projects.remove(id)
        .then((id) => {
            if(id){
                res.status(200).json({message: "success, removed from database"})
            } else {
                res.status(404).json({errorMessage: "error removing project from database"})
            }
        })
        .catch(error => {
            res.status(500).json({error: "there was an error processing the delete request"})
        })
})

// Edit an action by ID
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    console.log(id, changes);
    try {
        if (!changes) {
            res.status(400).json({error: 'You are missing a project description, or name' })
        }
        console.log(changes);
        await Projects.update(id, changes)
        .then(changes => {
            res.status(201).json(changes);
        })
        .catch(error => {
            res.status(500).json({error: "There was an error editing the project" })
        })
    }
    catch(error) {
        console.log(error);
        res.status(500).json({error: "you fucked up somewhere along the line" })
    }
})

module.exports = router;