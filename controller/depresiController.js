const depresi = require('../model/depresiModel')
const poolDepresi = require('../model/poolDepresiModel')



class Controller{

    static register(req, res){
        const {pertanyaan}= req.body
        depresi.findAll({
            where:{
                pertanyaan:pertanyaan
            }
        }).then(data=>{
            if(data.length){
                res.json({message :"data sudah ada"})
            }
            else{
                depresi.create({pertanyaan:pertanyaan}, {returning: true}).then(respon =>{
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
        
        depresi.update({
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

}

module.exports=Controller