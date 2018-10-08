const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

mongoose.connect('mongodb://localhost:27017');

fs.readdirSync(path.join(__dirname, '/models')).forEach(file => {
  require('./models/' + file);
});