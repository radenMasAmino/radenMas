const {verifyToken} = require('../helper/jwt')
const User = require('../model/usersModel')

function authorizationAdmin(req,res,next){
    
    
 const decode = verifyToken(req.headers.accesstoken)
   User.findAll({
        where:{
            password:decode.password
        }
    })
    .then(data=>{   
        if(data[0].dataValues.role=="admin"){ 
            next()
        }
        else{
            res.json({status : 400,message :"anda bukan admin" })
        }
    })
    .catch(err=>{
        next(err)
        
    })
}

function authorizationGuest(req,res,next){
    
    
    const decode = verifyToken(req.headers.accesstoken)
      User.findAll({
           where:{
               password:decode.password
           }
       })
       .then(data=>{   
           if(data[0].dataValues.role=="guest"){ 
               next()
           }
           else{
               res.json({status : 400,message :"anda bukan guest" })
           }
       })
       .catch(err=>{
           next(err)
           
       })
   }

module.exports = {authorizationAdmin,authorizationGuest}
