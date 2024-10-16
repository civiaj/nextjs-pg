import pg from 'pg'
import { Options, Sequelize } from 'sequelize'
import config from '../../database/config.js'

const options = config[process.env.NODE_ENV] as Options
options.dialectModule = pg
const sequelize = new Sequelize(options)

export default sequelize
