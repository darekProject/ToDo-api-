import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Task', (err, client) => {
    if(err) throw new Error('Error connection');
    console.log('We have connection with DB!!!');
});
