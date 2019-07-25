var Todo=require('../models/todo');
module.exports=(req,res,next)=>{
    Todo.find()
    .then(result=>{
        res.status(200).json({
            count:result.length,
            todos:result.map(data=>{
                return {
                    name:data.name,
                    description:data.description,
                    dueDate:data.dueDate,
                    status:data.status,
                    request:{
                        type:"GET",
                        url: req.protocol + '://' + req.get('host') + req.originalUrl+ '/' + data._id
                    }
                }
            })
        })
    })
    .catch(error=>{
        res.status(500).json({
            error:error
        })
    })
}