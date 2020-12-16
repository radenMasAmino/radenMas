const poolKecemasan=require('../model/poolKecemasanModel')
const users = require('../model/usersModel')
const kecemasan = require('../model/kecemasanModel')

class Controller{

    static register(req, res){
        const {jawaban,point,userId,kecemasanId}= req.body
         poolKecemasan.create({jawaban:jawaban,point:point,userId:userId,kecemasanId:kecemasanId}, {returning: true}).then(respon =>{
           res.json(respon)
        })
        .catch(err=>{
            res.json(err)
        })
      }
    
    static list(req,res){
        const{id}=req.params
        poolKecemasan.findAll({
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
        
        poolKecemasan.findAll({
            sort:[['id','ASC']],
            include:[users,kecemasan]
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
        
        poolKecemasan.update({
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
        poolKecemasan.destroy({
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
            poolKecemasan.destroy({where:{
            userId:id
        }})
        .then(hasil=>{
            poolKecemasan.bulkCreate(data[0].poolKecemasan,{returning:true})
        })
        .then(hasil=>{
            res.json('INPUT DATA SUKSES')
        })
    }
    

}

module.exports=Controller