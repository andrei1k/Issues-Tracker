import Knex from 'knex';
import { config } from '../knexfile';
import express from 'express';
import { Model } from 'objection';
import { authRouter } from './routers/AuthRouter';
import { projectRouter } from './routers/ProjectRouter';

const cors = require('cors');
const knex = Knex(config.development);
Model.knex(knex);

const app = express();
const port = 3001;
const IP = '0.0.0.0';
app.use(cors());
app.use(express.json());

app.use('/auth',authRouter);
app.use('/projects', projectRouter);


app.listen(port, IP, () => {
  console.log(`listening on ${IP}:${port}`);
});