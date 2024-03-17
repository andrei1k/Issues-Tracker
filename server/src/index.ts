import Knex from 'knex'
import { config } from '../knexfile';
import express from 'express'
import { Model } from 'objection';
import { UserServer } from './servers/UserServer';

const knex = Knex(config.development)
Model.knex(knex)

const app = express()
const port = 3000

app.get('/users', (req, res) => {

  const userService = new UserServer()

  userService.login('sasha', 'parolina').then(data => {
    
    console.log(`molodca ${data?.firstName}`);
    res.send(data)

  })
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  
    
})