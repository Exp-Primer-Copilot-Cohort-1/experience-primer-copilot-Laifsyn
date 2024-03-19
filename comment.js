// Create Webserver
// Use Express.js
// Use Mongoose.js
// Use Body-Parser

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/comment');

// Create Model
var Comment = mongoose.model('Comment', {
  name: String,
  comment: String
});

// Use Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create Webserver
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Create API
app.get('/api/comments', function(req, res) {
  Comment.find(function(err, comments) {
    if (err) {
      res.send(err);
    }
    res.json(comments);
  });
});

app.post('/api/comments', function(req, res) {
  Comment.create({
    name: req.body.name,
    comment: req.body.comment
  }, function(err, comment) {
    if (err) {
      res.send(err);
    }
    res.json(comment);
  });
});

app.delete('/api/comments/:comment_id', function(req, res) {
  Comment.remove({
    _id: req.params.comment_id
  }, function(err, comment) {
    if (err) {
      res.send(err);
    }
    Comment.find(function(err, comments) {
      if (err) {
        res.send(err);
      }
      res.json(comments);
    });
  });
});

// Run Webserver
app.listen(3000, function() {
  console.log('Server is running on port 3000');
});