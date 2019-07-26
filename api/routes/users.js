var express=require('express');
var router=express.Router();

//importing controllers

var userSignup=require('../controllers/userSignup');
var userLogin=require('../controllers/userLogin');
 
//using controllers

router.post('/signup',userSignup);
router.post('/login',userLogin);

//export router
module.exports=router;