const depresi = require('../model/depresiModel')
const poolDepresi = require('../model/poolDepresiModel')



class Controller{

    static register(req, res){
        const {pertanyaan,nomor,score}= req.body
        depresi.findAll({
            where:{
                pertanyaan:pertanyaan
            }
        }).then(data=>{
            if(data.length){
                res.json({message :"data sudah ada"})
            }
            else{
                depresi.create({pertanyaan:pertanyaan,score:score,nomor:nomor}, {returning: true}).then(respon =>{
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
        depresi.findAll({
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
        
        depresi.findAll({
            sort:[['nomor','ASC']]
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
        const {pertanyaan,score,nomor}= req.body
        
        depresi.update({
            pertanyaan:pertanyaan,
            score:score,
            nomor:nomor
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
        depresi.destroy({
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

        depresi.findAll(
        { 
            order: [
                // Will escape title and validate DESC against a list of valid direction parameters
                ['nomor', 'DESC'],
                ['score', 'ASC'],
            ],
            include:[{model:poolDepresi,
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

    static historyAdmin(req,res){
        const {id}= req.params
        depresi.findAll(
        { 
            order: [
                // Will escape title and validate DESC against a list of valid direction parameters
                ['nomor', 'DESC'],
                ['score', 'ASC'],
            ],
            include:[{model:poolDepresi,
                required:false,
            where:{
                userId:id,     
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