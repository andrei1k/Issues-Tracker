import Knex from 'knex'
import { config } from '../knexfile';
import express from 'express'

const knex = Knex(config.development);

const app = express();
const port = 3001;

app.get('/', (req, res) => {
  knex('test').then(value => {
    res.send(value);
  }).finally(() => {
    knex.destroy();
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})