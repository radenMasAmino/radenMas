const poolGgnControlEmosi=require('../model/poolGgnControlEmosiModel')
const users = require('../model/usersModel')
const ggnControlEmosi = require('../model/ggnControlEmosiModel')

class Controller{

    static register(req, res){
        const userId = req.dataUser.id
        const {jawaban,point,ggnControlEmosiId}= req.body
         poolGgnControlEmosi.create({jawaban:jawaban,point:point,userId:userId,ggnControlEmosiId:ggnControlEmosiId}, {returning: true}).then(respon =>{
           res.json(respon)
        })
        .catch(err=>{
            res.json(err)
        })
      }
    
    static list(req,res){
        const{id}=req.params
        poolGgnControlEmosi.findAll({
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
        
        poolGgnControlEmosi.findAll({
            sort:[['id','ASC']],
            include:[users,ggnControlEmosi]
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
        
        poolGgnControlEmosi.update({
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
        poolGgnControlEmosi.destroy({
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
        let data =req.body
            poolGgnControlEmosi.destroy({where:{
            userId:id
        }})
        .then(hasil=>{
            poolGgnControlEmosi.bulkCreate(data.poolGgnControlEmosi,{returning:true})
        })
        .then(hasil=>{
            res.json('INPUT DATA SUKSES')
        })
    }

}

module.exports=Controller