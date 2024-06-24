import Knex from 'knex';
import { config } from '../knexfile';
import express from 'express';
import { Model } from 'objection';
import { authRouter } from './routers/AuthRouter';
import { projectRouter } from './routers/ProjectRouter';
import { authMiddleware } from './middlewares/AuthMiddleware';
import { issueRouter } from './routers/IssueRouters';
import { statusRouter } from './routers/StatusRouter';

const cors = require('cors');
const knex = Knex(config.development);
Model.knex(knex);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/auth',authRouter);
app.use('/projects', authMiddleware, projectRouter);
app.use('/issues', authMiddleware, issueRouter);
app.use('/statuses', authMiddleware, statusRouter);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});