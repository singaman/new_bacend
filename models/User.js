const mongoose =  require("mongoose");
const bcrypt = require('bcrypt');


const userSchema = new mongooes.scheema({
   name : {
     type :String,
     required:true
   },
   email : {
     type :String,
     required:true,
     unique:true
   },
   gender : {
    type:String,
    required:true
   },
   password : {
    type:String,
    required :true
   },
   age :{
    type: Number,
    required :true
   },
   city :{
    type:String,
    required:true
   },
   post : [{
    type : mongoose.Schema.Types.objectId,
    ref:'post'
   }]

   userSchema.pre('save',async function (next){
    if(!this.isModified('password'))
       return next();
   })

})