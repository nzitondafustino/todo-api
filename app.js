var express=require('express');
var app=express();
var morgan=require('morgan');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://todo:1234567890@todo-1aeoa.mongodb.net/test?retryWrites=true&w=majority',
 {
    useNewUrlParser: true,
    useCreateIndex: true
});
var todoRoute=require('./api/routes/todo');
var userRoute=require('./api/routes/users');
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
app.use('/users',userRoute);

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