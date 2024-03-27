import Knex from 'knex';
import { config } from '../knexfile';
import express from 'express';
import { Model } from 'objection';
import { UserServer } from './servers/UserServer';


const CryptoJS = require('crypto-js');
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


app.post('/register', async (req, res) => {
  try {
    const userData = req.body;
    const userService = new UserServer();
    const existingUser = await userService.findByEmail(userData.email);

    if (existingUser) {
      return res.status(400).json({ error: 'The email is already registered.' });
    }

    userData.password = CryptoJS.SHA256(userData.password).toString();
    
    const newUser = userService.register(userData);
    
    res.status(201).json(newUser);
  } catch {
    res.status(500).json({ error: '...' });
  } 
});

app.post('/login', async (req, res) => {
  const userService = new UserServer();
  const { email, password } = req.body;
  const hashedPassword = CryptoJS.SHA256(password).toString();

  try {
    const data = await userService.login(email, hashedPassword);
    res.send(data);
  } catch {
    res.status(500).json({ error: '...' });
  }
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});