import mongoose from 'mongoose';
import './config';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Task', (err, client) => {
    if(err) throw new Error('Error connection');
    console.log('We have connection with DB!!!');
});
