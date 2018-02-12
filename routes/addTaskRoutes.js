import express from 'express';
import mongoose from 'mongoose';
import '../models/Tasks';

const router = express.Router();
const Tasks = mongoose.model('tasks');

router.put('/add', async (req, res) => {
    const {text, completed} = req.body.data;

    const task = new Tasks({
        text,
        completed,
        created_at: Date.now(),
        update_at: Date.now()
    });

    try {
        await task.save();
        res.status(200).send({data: 'success'})
    } catch (err) {
        res.status(422).send({data: err});
    }
});

export default router;