import mongoose from 'mongoose';
const { Schema } = mongoose;

const Tasks = new Schema({
   text: String,
   completed: false,
   created_at: {
       type: Date,
       default: Date.new
   },
    update_at: Date
});

mongoose.model('tasks', Tasks);