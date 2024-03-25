import Knex from 'knex'
import { config } from '../knexfile';
import express from 'express'
import { Model } from 'objection';
import { UserServer } from './servers/UserServer';

const cors = require('cors');

const knex = Knex(config.development);
Model.knex(knex);

const app = express();
// const IP = '192.168.0.108';
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/users', (req, res) => {

  const userService = new UserServer();

  userService.login('sasha', 'parolina').then(data => {
    
    console.log(`molodca ${data?.firstName}`);
    res.send(data);

  })
  
})


app.post('/register', (req, res) => {
  const { firstName, lastName, email } = req.body;
  res.json({ firstName, lastName, email });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})