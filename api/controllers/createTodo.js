var mongoose=require('mongoose');
var Todo=require('../models/todo');
module.exports=(req,res,next)=>{
    var todo=new Todo({
        _id:mongoose.Types.ObjectId(),
        name:req.body.name,
        description:req.body.description,
        dueDate:req.body.dueDate,
        status:req.body.status
    })
    todo.save()
    .then(result=>{
        res.status(200).json({
            _id:result._id,
            name:result.name,
            description:result.description,
            dueDate:result.dueDate,
            status:result.status,
            request:{
                type:"GET",
                url:req.protocol+ '://' + req.get('host') + req.originalUrl + '/' + result._id
            }


        })
    })
    .catch(error=>{
        res.status(500).json({
            error
        })

    })
}