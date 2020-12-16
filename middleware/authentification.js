const {verifyToken} = require('../helper/jwt')
const User = require('../model/usersModel')

function authentification(req,res,next){
    
    
 const decode = verifyToken(req.headers.accesstoken)
   User.findAll({
        where:{
            password:decode.password
        }
    })
    .then(data=>{
        if(data){ 
            req.dataUser=decode
            next()
        }
        else{
            res.json({status : 400,message :"anda belum login" })
        }
    })
    .catch(err=>{
        next(err)
        
    })
}

module.exports = authentification
