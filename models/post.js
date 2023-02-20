const mongoose =  require("mongoose");
const  postSchema  = new mongoose.Schema({
    title :{
        type:String,
        required:true
    },
    body :{
        type: String,
        required:true
    },
    devide : {
        type : String,
        enum : ['Laptop' , 'tabler' , 'Mobile'],
        required : true
    }, 
     no_of_comment : {
        type : Number,
        default : 0
     },
   user : {
     type: mongoose.Schema.Types.ObjectId,
     type :'user',
     required   : true
   }
});