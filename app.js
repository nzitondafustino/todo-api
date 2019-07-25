var express=require('express');
var app=express();
var morgan=require('morgan');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/todo', {useNewUrlParser: true});
var todoRoute=require('./api/routes/todo');
app.use(morgan('dev'));

//solving CORS problem

app.use((req,res,next)=>{

    res.header("Access-Control-Allow-Access",'*');
    res.header('Access-Control-Allow-Headers',
    "Origin,X-Requested-With,Content-Type,Accept,Authorization");
    if(req.method==="OPTIONS"){
        res.header("Access-Control-Allow-Methods",'PUT,POST,DELETE,PATCH,GET');
        return res.status(200).json({});
    }
    next();
})

app.use('/todo',todoRoute);

//creating route error

app.use((req,res,next)=>{
    error =new Error("Not Found");
    error.status=404;
    next(error);
})

//handling error

app.use((error,req,res,next)=>{
    res.status(error.status || 500).json({
        message:error.message
    })
})


module.exports=app