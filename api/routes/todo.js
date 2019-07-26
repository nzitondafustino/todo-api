var express=require('express');
var router=express.Router();

//importing  controllers

var getAllTodo=require('../controllers/getAllTodo');
var createTodo=require('../controllers/createTodo');
var updateTodo=require('../controllers/updateTodo');
var getTodo=require('../controllers/getTodo');
var deleteTodo=require('../controllers/deleteTodo');

//importing authentication middleware
var AuthCheck=require('../auth/authcheck');
//setting up routes
router.get('/',getAllTodo);
router.post('/',AuthCheck,createTodo);
router.patch('/:id',AuthCheck,updateTodo);
router.get('/:id',getTodo);
router.delete('/:id',AuthCheck,deleteTodo);


//export router
module.exports=router;