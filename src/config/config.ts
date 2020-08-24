import convict from 'convict'

// Define a schema
var config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  mongoUrl: {
    default: process.env.MONGO_URL || 'mongodb://localhost:27017/thewisedev-mailing'
  },
  port: {
    default: process.env.PORT || 5050
  },
  email: {
    host: {
      default: ''
    },
    port: {
      default: 587
    },
    username: {
      default: ''
    },
    password: {
      default: ''
    }
  }
})

// Load environment dependent configuration
var env = config.get('env')
config.loadFile('./config/' + env + '.json')

// Perform validation
config.validate({ allowed: 'strict' })

module.exports = config

export default config
