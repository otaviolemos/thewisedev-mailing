import { MongoHelper } from '../adapters/repositories/mongodb/helpers/mongo-helper'
import config from '../config/config'

MongoHelper.connect(config.get('mongoUrl'))
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(process.env.PORT || 5050, () => { console.log(`Server running at http://localhost:${config.get('port')}`) })
  })
  .catch(console.error)
