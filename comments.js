// Create web server
// Add comments route
// Add comments.json file
// Add comments.json file to gitignore

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/comments', (req, res) => {
  fs.readFile(path.resolve(__dirname, 'comments.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
    } else {
      res.send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Path: comments.json
// Create empty array

// []

// Path: .gitignore
// Add comments.json

// comments.json

// Path: public/index.html
// Create a simple form to submit comments

<!DOCTYPE html>
<html>
  <head>
    <title>Comments</title>
  </head>
  <body>
    <h1>Comments</h1>
    <form id="commentForm">
      <input type="text" id="comment" />
      <button type="submit">Add Comment</button>
    </form>
    <ul id="comments"></ul>
    <script src="index.js"></script>
  </body>
</html>

// Path: public/index.js
// Add event listener to form
// Fetch comments from server
// Render comments

document.getElementById('commentForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const comment = document.getElementById('comment').value;
  fetch('/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ comment }),
  })
    .then((response) => response.json())
    .then((comments) => {
      renderComments(comments);
    });
});

function renderComments(comments) {
  const commentsList = document.getElementById('comments');
  commentsList.innerHTML = '';
  comments.forEach((comment) => {
    const li = document.createElement('li');
    li.textContent = comment;
    commentsList.appendChild(li);
  });
}

fetch('/comments')
  .then((response))