const srq = require('../model/srqModel')
const poolSRQ = require('../model/poolSRQModel')



class Controller{

    static register(req, res){
        const {pertanyaan}= req.body
        srq.findAll({
            where:{
                pertanyaan:pertanyaan
            }
        }).then(data=>{
            if(data.length){
                res.json({message :"data sudah ada"})
            }
            else{
                srq.create({pertanyaan:pertanyaan}, {returning: true}).then(respon =>{
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
        srq.findAll({
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
        
        srq.findAll({
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
        
        srq.update({
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
        srq.destroy({
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

        srq.findAll(
        { 
            include:[{model:poolSRQ,
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

    static totalPoint(req,res){
        let userId= req.dataUser.id
        poolSRQ.sum('point', { where: { userId:userId } }).then(respon => {
            res.json({total:respon})
          })
    }

    static historyAdmin(req,res){
        const {id}= req.params
        srq.findAll(
        { 
            include:[{model:poolSRQ,
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