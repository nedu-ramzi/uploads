import http from 'http';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import { config } from './config/main.config';
import router from './routes/index';
import { errorHandler } from './helpers/errors.helpers';

const app = express();
const server = http.createServer(app);

//error Handler
errorHandler;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors({
    credentials: true
}));
app.use(compression());

//routes
app.use('/', router());
//database
config.database();
//server
server.listen(config.server.port, () => {
    console.log(`Application running on port ${config.server.port}`);
});