import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();
const Tasks = mongoose.model('tasks');

router.put('/change', async (req, res) => {
    const {_id, text, completed, deadline} = req.body.data;

    const task = await Tasks.findById(_id);
    if (!task) {
        return res.status(422).send({data: "Task not exist"});
    }

    try {
        task.text = text !== undefined ? text : task.text;
        task.completed = completed !== undefined ? completed : task.completed;
        task.deadline = deadline !== undefined ? deadline : task.deadline;
        task.save();

        res.status(200).send({data: task})
    } catch (err) {
        res.status(422).send({data: "Error: " + err});
    }
});

router.delete('/delete', async (req, res) => {
   const {_id} = req.body.data;

   try {
       await Tasks.findOneAndRemove(_id);
       res.status(200).send({data: 'Success. Task`s id: ' + _id});
   } catch (err) {
       res.status(422).send({data: 'Error: ' + err});
   }
});

export default router;