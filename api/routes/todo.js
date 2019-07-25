var express=require('express');
var mongoose=require('mongoose');
var router=express.Router();
var Todo=require('../models/todo');
//setting up routes
router.get('/',(req,res,next)=>{
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
})
router.post('/',(req,res,next)=>{
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
})
router.patch('/:id',(req,res,next)=>{
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
})
router.get('/:id',(req,res,next)=>{
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
})
router.delete('/:id',(req,res,next)=>{
    Todo.deleteOne({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:'Item deleted successfully',
            request:{
                type:"POST",
                url:req.protocol + '://' + req.get('host'),
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
})


//export router
module.exports=router;