var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/meantodos', ['todos']);

// GET ALL TODOS
router.get('/todos', function(req, res, next) {
    db.todos.find(function(err, todos) {
        if(err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    })
});

// GET SINGLE TODO
router.get('/todos/:id', function(req, res, next) {
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, todo) {
        if(err) {
            res.send(err);
        } else {
            res.json(todo);
        }
    })
});

// POST A TODO
router.post('/todo', function(req, res, next) {
    var todo = req.body;
    if(!todo.text || !(todo.isCompleted + '')) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todos.save(todo, function(err, result) {
            if(err) {
                res.send(err);
            } else {
                res.json(result);
            }
        })
    }
});

// UPDATE A TODO



module.exports = router;