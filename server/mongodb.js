const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

fs.readdirSync(path.join(__dirname, '/models')).forEach(file => {
  require('./models/' + file);
});
