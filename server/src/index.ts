import Knex from 'knex';
import { config } from '../knexfile';
import express from 'express';
import { Model } from 'objection';
import { authRouter } from './routers/AuthRouter';
import { projectRouter } from './routers/ProjectRouter';
import session from 'express-session';


declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

declare module 'express-serve-static-core' {
  interface Request {
      session: session.Session & Partial<session.SessionData>;
  }
}

const cors = require('cors');
const knex = Knex(config.development);
Model.knex(knex);

const app = express();
const port = 3001;
// const IP = '0.0.0.0';
app.use(cors());
app.use(express.json());

app.use(session({
  secret: 'my_secret_key', // Secret key to sign the session ID cookie
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set secure to true if using HTTPS
}));

app.use('/auth',authRouter);
app.use('/projects', projectRouter);


app.listen(port, () => {
  console.log(`listening on ${port}`);
});