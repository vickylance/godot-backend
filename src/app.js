import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import WebSocket from 'ws';
import { getVar, putVar } from '@gd-com/utils';
import { v4 } from 'uuid';
import mongoose from 'mongoose';

// import routes
import indexRouter from './routes/index';
import userRouter from './routes/user';

dotenv.config();

const app = express();

// Connect to db
mongoose.connect(
  process.env.MONGO_DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Connected to DB!!');
    }
  }
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// routers middleware
app.use('/', indexRouter);
app.use('/api/v1/user', userRouter);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.id = v4();

  ws.on('message', (message) => {
    const receiveBuff = Buffer.from(message);
    const receive = getVar(receiveBuff);
    console.log(receive);

    const buffer = putVar('Vignesh');
    ws.send(buffer);
  });
});

export { app };
export default server;
