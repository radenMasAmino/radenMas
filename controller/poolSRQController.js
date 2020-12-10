const poolSRQ=require('../model/poolSRQModel')
const users = require('../model/usersModel')
const SRQ = require('../model/SRQModel')

class Controller{

    static register(req, res){
        const {jawaban,point,userId,SRQId}= req.body
         poolSRQ.create({jawaban:jawaban,point:point,userId:userId,SRQId:SRQId}, {returning: true}).then(respon =>{
           res.json(respon)
        })
        .catch(err=>{
            res.json(err)
        })
      }
    
    static list(req,res){
        const{id}=req.params
        poolSRQ.findAll({
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
        
        poolSRQ.findAll({
            sort:[['id','ASC']],
            include:[users,SRQ]
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
        
        poolSRQ.update({
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
        poolSRQ.destroy({
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
            poolSRQ.destroy({where:{
            userId:data[0].userId
        }})
        .then(hasil=>{
            poolSRQ.bulkCreate(data[0].poolSRQ,{returning:true})
        })
        .then(hasil=>{
            res.json('INPUT DATA SUKSES')
        })
    }

}

module.exports=Controller