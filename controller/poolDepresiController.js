const poolDepresi=require('../model/poolDepresiModel')
const users = require('../model/usersModel')
const depresi = require('../model/depresiModel')
const excel = require("exceljs");
const koneksi= require('../config/connection');
const { QueryTypes } = require('sequelize');
class Controller{

    static register(req, res){
        const userId = req.dataUser.id
        const {jawaban,point,depresiId}= req.body
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
            sort:[['nomor','ASC']],
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
        console.log(req.body)
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
        const id = req.dataUser.id
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

    static async screening(req,res){
        const id = req.dataUser.id
        for(let i = 0;i<req.body.length;i++){
           req.body[i].userId= await id
        }
        // let data =req.body
            poolDepresi.destroy({where:{
            userId:id
        }})
        .then(hasil=>{
            poolDepresi.bulkCreate(req.body,{returning:true})
        })
        .then(hasil=>{
            res.json('INPUT DATA SUKSES')
        })
    }

    static downloadDepresi(req,res){
        users.findAll({attributes:["id","nama"],order:["id"]})
        .then(async (data1)=>{
            // res.json(data1)
            for(let i =0;i<data1.length;i++){
                
            let data2 = await depresi.findAll({
                    include:[{model:poolDepresi,required:false,
                    where:{
                        userId:data1[i].dataValues.id
                    }}
                 ]
                })
               
                    for(let j = 0;j<data2.length;j++){
                        let a = j+1
                        // console.log(data1[i].dataValues,"<<<")
                        // console.log(data2[j].dataValues.poolDepresis[0].dataValues,"<<<<<<<<<")
                        if(data2[j].dataValues.poolDepresis[0]){
                        data1[i].dataValues['jawaban'+a]=data2[j].dataValues.poolDepresis[0].jawaban
                        }
                        else{
                        data1[i].dataValues['jawaban'+a]=""
                        }
                    }
            }
//excell

            depresi.findAll({order:["id"]})
            .then(data3=>{
                res.json(data3)
            })


            // res.json(data1)
        })
        
    }

}

module.exports=Controller