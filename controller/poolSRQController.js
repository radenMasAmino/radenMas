const poolSRQ=require('../model/poolSRQModel')
const users = require('../model/usersModel')
const SRQ = require('../model/srqModel')
const excel = require("exceljs")

class Controller{

    static register(req, res){
        const userId = req.dataUser.id
        const {jawaban,point,SRQId}= req.body
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
        const id = req.dataUser.id
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

    static async screening(req,res){
        const id = req.dataUser.id
        for(let i = 0;i<req.body.length;i++){
           req.body[i].userId= await id
        }
        // let data =req.body
            poolSRQ.destroy({where:{
            userId:id
        }})
        .then(hasil=>{
            poolSRQ.bulkCreate(req.body,{returning:true})
        })
        .then(hasil=>{
            res.json('INPUT DATA SUKSES')
        })
    }

    static downloadSRQ(req,res){
        users.findAll({attributes:["id","nama"],order:["id"]})
        .then(async (data1)=>{
       
            for(let i =0;i<data1.length;i++){
                
            let data2 = await SRQ.findAll({
                    include:[{model:poolSRQ,required:false,
                    where:{
                        userId:data1[i].dataValues.id
                     
                    }}
                 ]
                })
               
                    for(let j = 0;j<data2.length;j++){
                        let a = j+1
                        let y = data2[j].dataValues.poolSRQs[0]
                        if(y!=undefined){
                        data1[i].dataValues['jawaban'+a]=data2[j].dataValues.poolSRQs[0].dataValues.jawaban
                        }
                        else{
                        data1[i].dataValues['jawaban'+a]="null"
                        }
                    }
            }

            SRQ.findAll({order:["id"]})
            .then(async (data3)=>{
                let y = []
                for(let i = 0;i<data1.length;i++){
                    y.push(data1[i].dataValues)
                }

                let workbook = new excel.Workbook();
                let worksheet = workbook.addWorksheet("SRQ");
                let n =[  { header: "No", key: "id", width: 5 },{ header: "Nama", key: "nama", width: 25 },]
                

                  for(let i=0;i<data3.length;i++){
                    let x ={}
                    x.header =data3[i].pertanyaan
                    x.key = `jawaban${i+1}`
                    x.width= 25
                    n.push(x)
                  }

                  worksheet.columns = n 
                  worksheet.addRows(y);

                   
                    res.setHeader(
                    "Content-Type",
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    );
                    res.setHeader(
                    "Content-Disposition",
                    "attachment; filename=" + "SRQ.xlsx"
                    );

                    return workbook.xlsx.write(res).then(function () {
                    res.status(200).end();
                    });


                // res.json([data1,data3])
            })


            // res.json(data1)
        })
        
    }

}

module.exports=Controller