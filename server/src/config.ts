import 'dotenv/config'
import convict from 'convict'

export const config = convict({
  database: {
    host: {
      doc: 'The postgresql host',
      env: 'DB_HOST',
      type: '*',
      default: 'localhost',
    },
    port: {
      doc: 'The postgresql port',
      env: 'DB_PORT',
      type: '*',
      default: 5432,
    },
    username: {
      doc: 'The postgresql username',
      env: 'DB_USERNAME',
      type: '*',
      default: 'postgres',
    },
    password: {
      doc: 'The postgresql password',
      env: 'DB_PASSWORD',
      default: 'password'
    },
    name: {
      doc: 'The postgresql database name',
      env: 'DB_NAME',
      type: '*',
      default: 'books'
    },
  },
})

config.validate()
