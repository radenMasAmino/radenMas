const poolPTSD=require('../model/poolPTSDModel')
const users = require('../model/usersModel')
const PTSD = require('../model/ptsdModel')

class Controller{

    static register(req, res){
        const {jawaban,point,userId,PTSDId}= req.body
         poolPTSD.create({jawaban:jawaban,point:point,userId:userId,PTSDId:PTSDId}, {returning: true}).then(respon =>{
           res.json(respon)
        })
        .catch(err=>{
            res.json(err)
        })
      }
    
    static list(req,res){
        const{id}=req.params
        poolPTSD.findAll({
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
        
        poolPTSD.findAll({
            sort:[['id','ASC']],
            include:[users,PTSD]
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
        
        poolPTSD.update({
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
        poolPTSD.destroy({
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
            poolPTSD.destroy({where:{
            userId:data[0].userId
        }})
        .then(hasil=>{
            poolPTSD.bulkCreate(data[0].poolPTSD,{returning:true})
        })
        .then(hasil=>{
            res.json('INPUT DATA SUKSES')
        })
    }

}

module.exports=Controller