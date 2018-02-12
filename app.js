import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Debug from 'debug';
import express from 'express';
import logger from 'morgan';
import './config/mongodb-connection';
// import path from 'path';

import addTask from './routes/addTaskRoutes';
import getTask from './routes/getTaskRoutes';

const app = express();
const debug = Debug('to-do-api:app');
// app.set('views', path.join(__dirname, 'views'));
// view engine setup
// app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());

app.use('/api', addTask);
app.use('/api', getTask);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Handle uncaughtException
process.on('uncaughtException', (err) => {
  debug('Caught exception: %j', err);
  process.exit(1);
});

export default app;
