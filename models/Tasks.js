import mongoose from 'mongoose';

const {Schema} = mongoose;

const Tasks = new Schema({
    text: String,
    completed: false,
    deadline: Date
});

mongoose.model('tasks', Tasks);