import { MongoHelper } from '../external/repositories/mongodb/helpers/mongo-helper'

MongoHelper.connect(process.env.MONGO_URL)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(process.env.PORT || 5000, () => { console.log(`Server running at http://localhost:${process.env.PORT}`) })
  })
  .catch(console.error)
