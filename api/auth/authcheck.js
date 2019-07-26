var jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
     try {
        var token=req.headers.authorization.split(" ")[1];
        const decode=jwt.verify(token,'secret');
        req.userData=decode
     } catch (error) {
        return res.status(500).json({
            message:"Auth failed"
        }) 
  }
  next();
}