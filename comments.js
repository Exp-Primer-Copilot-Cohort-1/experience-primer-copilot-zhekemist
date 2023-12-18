// Create web server
// Run: node comments.js
// Test: curl -X GET http://localhost:3000/comments
// Test: curl -X GET http://localhost:3000/comments/1
// Test: curl -X POST http://localhost:3000/comments -d "comment=This is a comment"
// Test: curl -X PUT http://localhost:3000/comments/1 -d "comment=This is a comment"
// Test: curl -X DELETE http://localhost:3000/comments/1

var express = require('express');
var app = express();

var comments = [
    { id: 1, comment: 'This is a comment' },
    { id: 2, comment: 'This is another comment' },
    { id: 3, comment: 'This is even another comment' }
];

// Get all comments
app.get('/comments', function(request, response) {
    response.setHeader('Content-Type', 'application/json');
    response.send(comments);
});

// Get a comment by id
app.get('/comments/:id', function(request, response) {
    var comment = comments.filter(function(comment) {
        return comment.id == request.params.id;
    });
    if (comment.length > 0) {
        response.setHeader('Content-Type', 'application/json');
        response.send(comment[0]);
    } else {
        response.sendStatus(404);
    }
});

// Create a new comment
app.post('/comments', function(request, response) {
    if (request.body.comment) {
        var newComment = {
            id: comments.length + 1,
            comment: request.body.comment
        };
        comments.push(newComment);
        response.setHeader('Content-Type', 'application/json');
        response.send(newComment);
    } else {
        response.sendStatus(400);
    }
});

// Update a comment
app.put('/comments/:id', function(request, response) {
    if (request.body.comment) {
        var comment = comments.filter(function(comment) {
            return comment.id == request.params.id;
        })[0];
        comment.comment = request.body.comment;
        response.sendStatus(200);
    } else {
        response.sendStatus(400);
    }
});

// Delete a comment
app.delete('/comments/:id', function(request, response) {
    comments = comments.filter(function(comment) {
        return comment.id != request.params.id;
    });
    response.sendStatus(200);
});

app.listen(300