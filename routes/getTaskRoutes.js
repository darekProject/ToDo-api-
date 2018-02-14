import express from 'express'
import mongoose from 'mongoose';

const Tasks = mongoose.model('tasks');

const router = express.Router();

router.get('/showAll', async (req, res) => {
    try {
        const allTasks = await Tasks.find({});

        res.status(200).send({data: allTasks});
    } catch (err) {
        res.status(422).send({data: 'Error: ' + err})
    }
});

router.get('/show/:completed', async (req, res) => {
    let {completed} = req.params;

    completed = String(completed) === 'true';

    try {
        const data = await Tasks.find({completed: completed});
        res.status(200).send({data});
    } catch (err) {
        res.status(422).send({data: 'Error: ' + err})
    }
});

export default router;

