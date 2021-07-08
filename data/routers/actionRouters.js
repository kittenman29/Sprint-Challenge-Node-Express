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
    const action = await Actions.get(req.params.id).catch(res.status(500).json({ error: "Await error" }));
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
router.delete('/:id', async (req, res) => {
    try {
      const count = await Actions.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'The action has been deleted successfully' });
      } else {
        res.status(404).json({ message: 'The action could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the action',
      });
    }
  });

// Edit an action by ID
router.put('/:id', async (req, res) => {
    try {
      const action = await Actions.update(req.params.id, req.body);
      if (action) {
        res.status(200).json({message: "action updated successfully"});
      } else {
        res.status(404).json({ message: 'The action could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the action',
      });
    }
  });


module.exports = router;