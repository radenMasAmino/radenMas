const poolGgnBelajar=require('../model/poolGgnBelajarModel')
const users = require('../model/usersModel')
const ggnBelajar = require('../model/ggnBelajarModel')

class Controller{

    static register(req, res){
        const {jawaban,point,userId,ggnBelajarId}= req.body
         poolGgnBelajar.create({jawaban:jawaban,point:point,userId:userId,ggnBelajarId:ggnBelajarId}, {returning: true}).then(respon =>{
           res.json(respon)
        })
        .catch(err=>{
            res.json(err)
        })
      }
    
    static list(req,res){
        const{id}=req.params
        poolGgnBelajar.findAll({
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
        
        poolGgnBelajar.findAll({
            sort:[['id','ASC']],
            include:[users,ggnBelajar]
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
        
        poolGgnBelajar.update({
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
        const id = req.dataUser.id
        poolGgnBelajar.destroy({
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
        const id = req.dataUser.id
        let data =[req.body]
            poolGgnBelajar.destroy({where:{
            userId:id
        }})
        .then(hasil=>{
            poolGgnBelajar.bulkCreate(data[0].poolGgnBelajar,{returning:true})
        })
        .then(hasil=>{
            res.json('INPUT DATA SUKSES')
        })
    }

}

module.exports=Controller