const express = require('express');

const Actions = require('../helpers/actionModel.js');

const router = express.Router();

// Get all actions
router.get('/', (req, res) => {
    Actions.get()
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        res.status(500).json({message: 'Encountered an error retrieving the actions'})
    })
});

// Get actions by ID
router.get('/:id', async (req, res) => {
    const action = await Actions.get(req.params.id);
    console.log(req.params.id);
    try {
        if(action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({ message: "The action you are looking for doesn't exist" });
        }
    }
    catch {
        res.status(500).json({ error: "The action information could not be retrieved" });
    }
})

// // Get actions by project_id

// router.get('/:id/:projectId', async (req, res) => {
//     const action = await Actions.get(req.params.id);
//     const projectId = await Actions.get(req.params.project_id);
//     console.log(req.params.project_id);
//     try {
//         if(action && projectId) {
//             res.status(200).json(action, projectId);
//         } else {
//             res.status(404).json({ message: "The project id you are looking for doesn't exist" });
//         }
//     }
//     catch {
//         res.status(500).json({ error: "The project id information could not be retrieved" });
//     }
// })

// Add new action
router.post('/newaction', async (req, res) => {
    const { project_id, description, notes } = req.body;
    console.log(project_id, description, notes);
    try {
        if (!project_id || !description || !notes) {
            res.status(400).json({error: 'You are missing a project id, description, or notes' })
        }
        console.log(project_id, description, notes);
        Actions.insert({
            project_id,
            description,
            notes
        })
        .then(action => {
            res.status(201).json(action);
        })
        .catch(error => {
            res.status(500).json({error: "There was an error adding a new action" })
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
    Actions.remove(id)
        .then((id) => {
            if(id){
                res.status(200).json(`message: ${id} removed from database`)
            } else {
                res.status(404).json({errorMessage: "error removing id from database"})
            }
        })
        .catch(error => {
            res.status(500).json({error: "there was an error processing the delete request"})
        })
})

// Edit an action
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    console.log(id, changes);
    try {
        if (!project_id || !description || !notes) {
            res.status(400).json({error: 'You are missing a project id, description, or notes' })
        }
        console.log(changes);
        Actions.update(changes)
        .then(changes => {
            res.status(201).json(changes);
        })
        .catch(error => {
            res.status(500).json({error: "There was an error editing the action" })
        })
    }
    catch(error) {
        console.log(error);
        res.status(500).json({error: "you fucked up somewhere along the line" })
    }
})










module.exports = router;