const express=require('express');
const jwt = require('jsonwebtoken');
const app=express();
app.get('/api',(req,res)=>{
    res.json({
        message:"welcome to api"
    });
});
app.get('/api',(req,res)=>{
    res.json({
        message:"welcome to api"
    });
}); 
app.post('/api/posts',verifyToken,(req,res)=>{
   jwt.verify(req.token,'secretkey',(err,authdata)=>{
       if(err){
           res.send(err);
       }else{
    res.json({
        message:"welcome to posts",
        authdata
    });
}
   });
}); 
app.post('/api/login',(req,res)=>{
    user={
        name:"saji",
        email:'sajeeds63@gmail.com'

    }
    jwt.sign({user},'secretkey',{expiresIn:'30s'},(err,token)=>{
        res.json({
            token
        });

    })
});
function verifyToken(req,res,next){
    const bearerHeader=req.headers['authorization'];
    if(typeof bearerHeader!== 'undefined'){
        const bearer=bearerHeader.split(' ');
        const bearerToken=bearer[1];
        req.token=bearerToken;
        next();
    }else{
        res.send('unauthorized');
    }
}

app.listen(7000);