const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const path = require("path");
const port = 8080;
app.set('view engine', 'ejs');
app.set("views",path.join(__dirname,'views'));
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


const users = [
   
];
const login = [
     {
        id: null
     }
];

currentUser = null;

app.get('/',(req,res)=>{
   
    res.render('sign_in.ejs', {error : null , id : null});
});
app.post('/ragistor',(req,res)=>{
     
     let {username ,c_password,cm_password,pin} = req.body;
    
     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*@).+$/;
     
        
     if(c_password == cm_password && regex.test(c_password) && !username =='' && !pin == ''){
        let olduser  = users.find((u) => u.username == username);
        if(olduser == undefined){
         let id =  Date.now();
         users.push({id,username,c_password,pin});
         console.log(id,users);
         res.redirect('/');
        }
        if(olduser.username == username){
          res.render("sign_up.ejs", {error: "username not available!!"});
       }else{
       
         res.send('404 Error');
       }    
     
    }}); 
app.get('/ragistor',(req,res)=>{
    res.render('sign_up.ejs',{error : null});
});
app.post("/",(req,res)=>{
    const {username,password}= req.body;
    const user = users.find((u) => u.username === username );
    if(user){
        if(user.c_password === password){
            current = user;
             
            res.redirect("/home");
        }else{
            login.push(user.id,user.username);
             
           res.render("sign_in.ejs", {error: "Wrong password!!"});
        }
        
    }else{
        
        res.render("sign_in.ejs", {error: " User not found!!"});
    }
});
app.get('/user/', (req,res)=>{
    res.render('forget.ejs',{error: null, username: null})
});
app.post('/user/', (req, res)=>{
    const {username,pin}= req.body;
    const user = users.find((u) => u.username === username );
    if(user){
        if(user.pin === pin){
            current = user;
             let id = user.id;
            res.redirect(`/user/${id}`);
        }else{  
             
           res.render("forget.ejs", {error: "Wrong pin!!",username : null});
        }
        
    }else{
        
        res.render("forget.ejs", {error: " User not found!!", username :null});
    }
});
app.get('/user/:id', (req,res)=>{
    let {id} = req.params;
    const user = users.find((u) => u.id == id);
    console.log(id,user);
    let username = user.username;
    console.log(username)
    res.render('forget.ejs',{error: null, username,id})
});

app.patch('/user/', (req,res)=>{
     let {username ,c_password,cm_password} = req.body;
    
     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*@).+$/;
  
    
     if(c_password == cm_password && regex.test(c_password)){
        let user  = users.find((u) => u.username == username);
         let newPassword  =  c_password;
         user.c_password  = newPassword;
         console.log(user);
         res.redirect('/');
          
     
    }else{
        res.send('eroor')
    }
}); 

app.get('/home',(req,res)=>{
      
    res.render('home.ejs',{error: null});
    
});


app.listen(port,()=>{
    console.log(`server ${port} running`);
    
});