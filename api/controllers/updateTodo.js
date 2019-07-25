var Todo=require('../models/todo');
module.exports=(req,res,next)=>{
    var id=req.params.id;
    var updateOps={};
    for(op of req.body){
        updateOps[op.propName]=op.value;
    }
    Todo.update({_id:id},{$set:updateOps})
    .then(result=>{
         res.status(200).json({
             _id:result._id,
             request:{
                 type:"GET",
                 url:req.protocol + '://' + req.get('host')  + req.originalUrl
             }
         })
    })
    .catch(error=>{
        res.status(500).json({
            error
        }) 
    })
}