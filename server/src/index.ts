import Knex from 'knex';
import { config } from '../knexfile';
import express from 'express';
import { Model } from 'objection';
import { UserServer } from './servers/UserServer';


const CryptoJS = require("crypto-js");
const cors = require('cors');

const knex = Knex(config.development);
Model.knex(knex);

const app = express();
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
  const userData = req.body;
  const hashedPassword = CryptoJS.SHA256(userData.password).toString();
  try {
    userData.password = hashedPassword;
    const userService = new UserServer();
    const newUser = userService.register(userData);
    res.status(201).json(newUser);
  } catch {
    res.status(500).json({ error: '...' });
  } 
});

app.post('/login', (req, res) => {
  const userService = new UserServer();
  const { email, password } = req.body;
  const hashedPassword = CryptoJS.SHA256(password).toString();

  try {
    userService.login(email, hashedPassword).then( data => {
      res.send(data);
    });

  } catch {
    res.status(500).json({ error: '...' });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})