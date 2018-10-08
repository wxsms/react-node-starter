const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const uuid = require('uuid/v4');
const mime = require('mime');

const upload = multer({
  storage: multer.diskStorage({
    destination (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/uploads'));
    },
    filename (req, file, cb) {
      cb(null, `${uuid()}.${mime.getExtension(file.mimetype)}`);
    }
  }),
  fileFilter (req, file, cb) {
    const mime = file.mimetype;
    cb(null, mime.indexOf('image') >= 0);
  }
});

router.post('/auth/register', (req, res) => {
  const user = new User(req.body);
  user.save()
    .then(doc => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.error(err);
      if (err.code === 11000) {
        res.sendStatus(406);
      } else {
        res.sendStatus(500);
      }
    });
});

router.post('/auth/login', (req, res) => {
  User.findOne({username: req.body.username})
    .then(doc => {
      if (doc) {
        const valid = doc.authenticate(req.body.password);
        if (valid) {
          req.session.user = {
            username: doc.username,
            _id: doc._id
          };
          res.sendStatus(200);
        } else {
          res.sendStatus(401);
        }
      } else {
        res.sendStatus(401);
      }
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.post('/auth/logout', (req, res) => {
  req.session.user = null;
  res.sendStatus(200);
});

router.post('/auth/current', (req, res) => {
  res.json(req.session.user);
});

module.exports = router;
