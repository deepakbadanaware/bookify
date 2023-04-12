const express=require('express');
const path=require('path');
const app=express();
const hbs=require('hbs');
const bcryp=require('bcryptjs');


require('./db/conn');
const Register=require("./models/registers");

const static_path=path.join(__dirname,"../public");
const templates_path=path.join(__dirname,"../tempalete/views");
const partials_path=path.join(__dirname,"../tempalete/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));


app.set('view engine', 'hbs');
app.set("views" ,templates_path);

hbs.registerPartials(partials_path);
app.get('/',(req,res)=>{
    res.render("index");
})
app.get('/index',(req,res)=>{
    res.render("index");
})
app.get('/register',(req,res)=>{
    res.render("register");
})

app.post('/register',async (req,res)=>{
  try{
    const Password=req.body.Password;
    const cPassword=req.body.ConfirmPassword;
    if(Password===cPassword){

        const registerEmpolyee=new Register({
            User:req.body.User,
            Email:req.body.Email,
            Password:req.body.Password,
            ConfirmPassword:req.body.ConfirmPassword,
        })

      const registered =await  registerEmpolyee.save();
res.status(201).render("index");
    }else{
        res.send("not match");
    }
    
  }catch(err){
    res.status(400).send(err);
  }
})
app.get('/login',(req,res)=>{
    res.render("login");
})
app.post('/login',async(req,res)=>{
   try {

    const Email=req.body.Email;
    const Password=req.body.Password;
    const useremail =await  Register.findOne({Email:Email});

const isMatch=await bcryp.compare(Password,useremail.Password);

  if(isMatch){
    res.status(201).render("index");
  }


    
   } catch (error) {
    res.status(400).send("ivalid email")
   }
})

// const securePass=async(Password)=>{
//  const PasswordHash=await   bcryp.hash(Password,10);
//  console.log(PasswordHash);
//  const PasswordMatch=await   bcryp.compare(Password,PasswordHash);
//  console.log(PasswordMatch)
// }

// securePass("deepak");



app.listen(3000);
