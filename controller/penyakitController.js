const penyakit = require('../model/penyakitModel')



class Controller{

    static register(req, res){
        const {namaPenyakit}= req.body
        penyakit.findAll({
            where:{
                namaPenyakit:namaPenyakit
            }
        }).then(data=>{
            if(data.length){
                res.json({message :"data sudah ada"})
            }
            else{
                penyakit.create({namaPenyakit:namaPenyakit}, {returning: true}).then(respon =>{
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
        penyakit.findAll({
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
        
        penyakit.findAll({
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
        const {namaPenyakit}= req.body
        
        penyakit.update({
            namaPenyakit:namaPenyakit
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
        penyakit.destroy({
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

}

module.exports=Controller