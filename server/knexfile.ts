import { config as envConfig } from  './src/config'
import { knexSnakeCaseMappers } from 'objection'

export const config = {
  development: {
    // debug: true,
    client: 'postgres',
    connection: {
      host: envConfig.get('database.host'),
      port: envConfig.get('database.port'),
      user: envConfig.get('database.username'),
      password: envConfig.get('database.password'),
      database: envConfig.get('database.name')
    },
    ...knexSnakeCaseMappers()
  }
}

export default config