const users = require('../model/usersModel')
const bcrypt = require('../helper/bcrypt')
const jwt = require('../helper/jwt')



class Controller{

    static register(req, res){
        const {username,password,nama,alamat,usia,pekerjaan,email}= req.body
        
        let encryptedPassword = bcrypt.hashPassword(password)
        users.findAll({
            where:{
                username:username
            }
        }).then(data=>{
            if(data.length){
                res.json({message :"Username Sudah Terdaftar"})
            }
            else{
                
                users.create({username:username, password:encryptedPassword,nama:nama,alamat:alamat,usia:usia,pekerjaan:pekerjaan,email:email}, {returning: true}).then(respon =>{
                res.json(respon)
             })
             .catch(err=>{
                 res.json(err)
             })}
        })
         
      }

    static login(req,res){
        const{username,password}= req.body

        users.findAll({
            where:{
                username:username
            }
        })
        .then(data=>{
            if(data.length){
        let hasil =  bcrypt.compare(password, data[0].dataValues.password);
                if(hasil){
                    res.json({token : jwt.generateToken(data[0].dataValues)})
                }
                else{
                    res.json({message : "password salah"})
                }
            }
            else{res.json({message :"username tidak terdaftar"})}
        })
        .catch(err=>{
            res.json({message : err})
        })
    }
    
    static list(req,res){
        const{id}=req.params
        users.findAll({
            where:{
                id :id
            }
        },{returning:true})
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }
    
    static update(req,res){
        const {id}=req.params
        const {username,password,nama,alamat,usia,pekerjaan,email}= req.body
        
        users.update({
            username:username,
            password:password,
            nama:nama,
            alamat:alamat,
            usia:usia,
            pekerjaan:pekerjaan,
            email:email,

        },{
            where :{
                id:id
            },
            returning: true,
            plain:true
        })
        .then(respon=>{
            res.json(respon)
        })
        .catch(err=>{
            res.json(err)
        })

    }

    static delete(req,res){
        const{id}= req.params
        users.destroy({
            where : {
                id: id
            }
        }).then(respon=>{
            res.json(`berhasil delete id : ${id}`)
            
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static all(req,res){
        
        users.findAll({
            sort:[['id','ASC']]
        })
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }

}

module.exports=Controller


