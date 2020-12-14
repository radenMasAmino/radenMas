const poolDepresi=require('../model/poolDepresiModel')
const users = require('../model/usersModel')
const depresi = require('../model/depresiModel')

class Controller{

    static register(req, res){
        const {jawaban,point,userId,depresiId}= req.body
         poolDepresi.create({jawaban:jawaban,point:point,userId:userId,depresiId:depresiId}, {returning: true}).then(respon =>{
           res.json(respon)
        })
        .catch(err=>{
            res.json(err)
        })
      }
    
    static list(req,res){
        const{id}=req.params
        poolDepresi.findAll({
            where:{
                id :id
            }
        })
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }

    

    static all(req,res){
        
        poolDepresi.findAll({
            sort:[['id','ASC']],
            include:[users,depresi]
        })
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }
    
    static update(req,res){
        const {id}=req.params
        const {jawaban}= req.body
        const {point} = req.body
        
        poolDepresi.update({
            jawaban:jawaban,
            point : point
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
        poolDepresi.destroy({
            where : {
                userId: id
            }
        }).then(respon=>{
            res.json(`berhasil delete id : ${id}`)
            
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static screening(req,res){
        let data =[req.body]
            poolDepresi.destroy({where:{
            userId:data[0].userId
        }})
        .then(hasil=>{
            poolDepresi.bulkCreate(data[0].poolDepresi,{returning:true})
        })
        .then(hasil=>{
            res.json('INPUT DATA SUKSES')
        })
    }

}

module.exports=Controller