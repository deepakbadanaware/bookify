const mongoose=require('mongoose');

const bcrypt=require("bcryptjs");
const employeSchema=new mongoose.Schema({



    User:{
        type:String,
        required:true,
        unique:true
    },

    Email:{
        type:String,
        required:true,
        unique:true
    }
,
    Password:{
        type:String,
        required:true,
        
       
    }
,
   ConfirmPassword:{
        type:String,
        required:true,


    }




})


employeSchema.pre("save",async function(next){
    if(this.isModified("Password")){
   
    this.Password=await bcrypt.hash(this.Password,10);
    this.ConfirmPassword=undefined;
}
next();
})

const Register=new mongoose.model("Register",employeSchema);

module.exports=Register;