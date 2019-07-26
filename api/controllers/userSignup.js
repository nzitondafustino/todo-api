var mongoose=require('mongoose');
var User=require('../models/user');
var bcrypt=require('bcrypt');
module.exports=(req,res,next)=>{
    User.find({email:req.body.email}).then(result=>{
        if(result.length > 0)
        {
            return res.status(409).json({
                message:"email has used"
            })
        }
        else {
            bcrypt.hash(req.body.password,10,(error,hash)=>{
                if(error){
                    return res.status(500).json({
                        message:"signup failed"
                    })
                }
                else {
                   var user=new User({
                       _id:mongoose.Types.ObjectId(),
                       email:req.body.email,
                       password:hash
               
                   })
                   user.save()
                   .then(result=>{
                       res.status(201).json({
                           message:'user created successfully',
                       })
                   })
                   .catch(error=>{
                       res.status(500).json({
                           error:error
                       })
                   })
                }
             })
        }
    })
    .catch(error=>{
        res.status(200).json({
            error:error
        })
    })
  }