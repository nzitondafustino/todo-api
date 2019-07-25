var express=require('express');
var router=express.Router();

//importing  controllers

var getAllTodo=require('../controllers/getAllTodo');
var createTodo=require('../controllers/createTodo');
var updateTodo=require('../controllers/updateTodo');
var getTodo=require('../controllers/getTodo');
var deleteTodo=require('../controllers/deleteTodo');
//setting up routes
router.get('/',getAllTodo);
router.post('/',createTodo);
router.patch('/:id',updateTodo);
router.get('/:id',getTodo);
router.delete('/:id',deleteTodo);


//export router
module.exports=router;