import config from '../config'
import { createConnections } from 'typeorm'
import * as path from 'path'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { type, username, password, host, port, database, sync, logging } = config.mysql
export default createConnections([{
  name: 'default',
  type: type,
  host: host,
  port: port,
  username: username,
  password: password,
  database: database,
  entities: [path.resolve(__dirname, '../entity/*.*')],
  // DO NOT enable in production
  // synchronize: sync,
  logging: logging
}, {
  name: 'mongodb',
  useUnifiedTopology: true,
  type: config.mongodb.type,
  host: config.mongodb.host,
  port: config.mongodb.port,
  database: config.mongodb.database,
  entities: [path.resolve(__dirname, '../entity/mongodb/*.*')]
  // DO NOT enable in production
  // synchronize: config.mongodb.sync
}])
