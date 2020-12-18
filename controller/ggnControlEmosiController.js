const ggnControlEmosi = require('../model/ggnControlEmosiModel')
const poolGgnControlEmosi= require('../model/poolGgnControlEmosiModel')



class Controller{

    static register(req, res){
        const {pertanyaan}= req.body
        ggnControlEmosi.findAll({
            where:{
                pertanyaan:pertanyaan
            }
        }).then(data=>{
            if(data.length){
                res.json({message :"data sudah ada"})
            }
            else{
                ggnControlEmosi.create({pertanyaan:pertanyaan}, {returning: true}).then(respon =>{
                    res.json(respon)
                 })
                 .catch(err=>{
                     res.json(err)
                 })
            }
        })
         
        
      }
    
    static list(req,res){
        const{id}=req.params
        ggnControlEmosi.findAll({
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
        
        ggnControlEmosi.findAll({
            sort:[['id','ASC']]
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
        const {pertanyaan}= req.body
        
        ggnControlEmosi.update({
            pertanyaan:pertanyaan
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
        ggnControlEmosi.destroy({
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

    static history(req,res){

        ggnControlEmosi.findAll(
        { 
            include:[{model:poolGgnControlEmosi,
                required:false,
            where:{
                userId:req.dataUser.id,     
            }}]
            
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