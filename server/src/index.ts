import Knex from 'knex';
import { config } from '../knexfile';
import express from 'express';
import { Model } from 'objection';
import { authRouters } from './routers/AuthRouters';
import { userRouter } from './routers/UserRouter';
import { projectRouters } from './routers/ProjectRouters';

const cors = require('cors');

const knex = Knex(config.development);
Model.knex(knex);

const app = express();
const port = 3001;
const IP = '0.0.0.0';
app.use(cors());
app.use(express.json());

app.use('/users',userRouter);
app.use('/auth',authRouters);
app.use('/projects', projectRouters);


app.listen(port, IP, () => {
  console.log(`listening on ${IP}:${port}`);
});