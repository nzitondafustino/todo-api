var mongoose=require('mongoose');
var todoSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    dueDate:{
        type:Date,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    }
});
module.exports=mongoose.model('Todo',todoSchema);