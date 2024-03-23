import Knex from 'knex'
import { config } from '../knexfile';
import express from 'express'

const knex = Knex(config.development);

const app = express();
const port = 3001;
const IP = '192.168.0.108';

app.get('/', (req, res) => {
  knex('test').then(value => {
    res.send(value);
  }).finally(() => {
    knex.destroy();
  })
})

app.listen(port, IP, () => {
  console.log(`Example app listening on port ${port}`);
})