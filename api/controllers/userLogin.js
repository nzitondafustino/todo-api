var bcrypt=require('bcrypt');
var User=require('../models/user');
var jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
    User.findOne({email:req.body.email})
    .then(result=>{
        if(!result){
            return res.status(500).json({
                message:'Auth Failed'
            })
        }
        else {
        bcrypt.compare(req.body.password,result.password)
        .then(rt=>{
            if(rt){
                jwt.sign({
                    _id:result._id,
                    email:result.email
                  }, 'secret',
                  {expiresIn:'1h'},
                  (error,token)=>{
                      if(error){
                          return res.status(500).json({
                              message:"Auth failed"
                          })
                      }
                    res.status(200).json({
                      _id:result._id,
                      emai:result.email,
                      token:token
                    })
                  });
            }
        })
        .catch(error=>{
            res.status(200).json({
                message:"auth failed"
            })
        })
        }
    })
    .catch(error=>{
        res.status(500).json({
            error:error
        })
    });
}