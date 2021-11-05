const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')

const url = process.env.DATABASE_URL || 'mongodb://localhost:27017'

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

fs.readdirSync(path.join(__dirname, '/models')).forEach(file => {
  require('./models/' + file)
})
