import Knex from 'knex';
import { config } from '../knexfile';
import express from 'express';
import { Model } from 'objection';
import { UserServer } from './servers/UserServer';


const CryptoJS = require('crypto-js');
const cors = require('cors');

const https = require('https');
const fs = require('fs');
const path = require('path');

const knex = Knex(config.development);
Model.knex(knex);

const app = express();
const port = 3001;


const keyPath = path.join(__dirname, '../../ssl-cert/example.key');
const certificatePath = path.join(__dirname, '../../ssl-cert/example.crt');
const privateKey = fs.readFileSync(keyPath, 'utf8');
const certificate = fs.readFileSync(certificatePath, 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

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

httpsServer.listen(port, () => {
  console.log(`HTTPS Server running on port ${port}`);
});