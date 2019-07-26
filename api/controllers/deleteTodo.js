var Todo=require('../models/todo');
module.exports=(req,res,next)=>{
    Todo.deleteOne({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:'Item deleted successfully',
            request:{
                type:"POST",
                url:req.protocol + '://' + req.get('host') + '/todo',
                body:{
                    name:'String',
                    description:'String',
                    dueDate:'Date',
                    status:'Boolean'
                }
            }
        })
    })
    .catch(error=>{
        res.status(500).json({
            error
        })
    })
}