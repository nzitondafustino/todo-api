var Todo=require('../models/todo');
module.exports=(req,res,next)=>{
    Todo.findById(req.params.id)
    .then(result=>{
        if(!result)
        {
            return res.status(404).json({
                message:'Item not foung'
            })
        }
       res.status(200).json({
           _id:result._id,
           name:result.name,
           description:result.description,
           dueDate:result.dueDate,
           status:result.status,
           request:{
               type:'GET',
               url:req.protocol + '://' + req.get('host') + '/todo'
           }

       })
    })
    .catch(error=>{
        res.status(500).json({
            error
        })
    })
}