var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/meantodos', ['todos']);

// GET TODOS
router.get('/todos', function(req, res, next) {
    db.todos.find(function(err, todos) {
        if(err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    })
});



module.exports = router;