const users = require('../model/usersModel')
const bcrypt = require('../helper/bcrypt')
const jwt = require('../helper/jwt')
const kecemasan = require('../model/kecemasanModel')
const depresi = require('../model/depresiModel')
const PTSD = require('../model/ptsdModel')
const SRQ = require('../model/srqModel')
const ggnBelajar = require('../model/ggnBelajarModel')
const ggnControlEmosi=require('../model/ggnControlEmosiModel')
const poolKecemasan = require('../model/poolKecemasanModel')
const poolDepresi = require('../model/poolDepresiModel')
const poolPTSD = require('../model/poolPTSDModel')
const poolSRQ = require('../model/poolSRQModel')
const poolGgnBelajar = require('../model/poolGgnBelajarModel')
const poolGgnControlEmosi = require('../model/poolGgnControlEmosiModel')


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
        const {username,password,nama,alamat,usia,pekerjaan,email,role}= req.body
        
        users.update({
            username:username,
            password:password,
            nama:nama,
            alamat:alamat,
            usia:usia,
            pekerjaan:pekerjaan,
            email:email,
            role:role

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

    static details(req,res){
        const{id}=req.params
        users.findAll({
            where:{
                id :id
            },
            include:[{model:poolDepresi,include:[depresi]},
                    {model:poolKecemasan,include:[kecemasan]},
                    {model:poolPTSD,include:[PTSD]},
                    {model:poolSRQ,include:[SRQ]},
                    {model:poolGgnBelajar,include:[ggnBelajar]},
                    {model:poolGgnControlEmosi,include:[ggnControlEmosi]}]
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


