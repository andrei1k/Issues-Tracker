import Knex from 'knex';
import { config } from '../knexfile';
import express from 'express';
import { Model } from 'objection';

import { User } from "./models/User";


const cors = require('cors');
const knex = Knex(config.development);
Model.knex(knex);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

async function testFunction() {
  
  let users = await User.query().withGraphFetched('projects')

  users.forEach(user => {
    console.log(user?.email, user?.projects)
  })
}

app.listen(port, async () => {
  console.log(`listening on ${port}`);
  await testFunction()
});