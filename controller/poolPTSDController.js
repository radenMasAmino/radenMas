const poolPTSD=require('../model/poolPTSDModel')
const users = require('../model/usersModel')
const PTSD = require('../model/ptsdModel')
const excel = require("exceljs")


class Controller{

    static register(req, res){
        const userId = req.dataUser.id
        const {jawaban,point,PTSDId}= req.body
         poolPTSD.create({jawaban:jawaban,point:point,userId:userId,PTSDId:PTSDId}, {returning: true}).then(respon =>{
           res.json(respon)
        })
        .catch(err=>{
            res.json(err)
        })
      }
    
    static list(req,res){
        const{id}=req.params
        poolPTSD.findAll({
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
        
        poolPTSD.findAll({
            sort:[['id','ASC']],
            include:[users,PTSD]
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
        
        poolPTSD.update({
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
        poolPTSD.destroy({
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
            poolPTSD.destroy({where:{
            userId:id
        }})
        .then(hasil=>{
            poolPTSD.bulkCreate(req.body,{returning:true})
        })
        .then(hasil=>{
            res.json('INPUT DATA SUKSES')
        })
    }

    static downloadPTSD(req,res){
        users.findAll({attributes:["id","nama"],order:["id"]})
        .then(async (data1)=>{
            // console.log(data1[0].dataValues.id,">>>>>>>>>>>>????")
            // res.json(data1)
            for(let i =0;i<data1.length;i++){
                
            let data2 = await PTSD.findAll({
                    include:[{model:poolPTSD,required:false,
                    where:{
                        userId:data1[i].dataValues.id
                        // userId:20
                    }}
                 ]
                })
               
                    for(let j = 0;j<data2.length;j++){
                        let a = j+1
                        let y = data2[j].dataValues.poolPTSDs[0]
                        // console.log(data2[j].dataValues.poolPTSDs[0].dataValues.jawaban,"<<<")
                        // console.log(data2[j].dataValues.poolDepresis[0].dataValues,"<<<<<<<<<")
                        if(y!=undefined){
                        data1[i].dataValues['jawaban'+a]=data2[j].dataValues.poolPTSDs[0].dataValues.jawaban
                        }
                        else{
                        data1[i].dataValues['jawaban'+a]="null"
                        }
                    }
            }
//excell

            PTSD.findAll({order:["id"]})
            .then(async (data3)=>{
                let y = []
                for(let i = 0;i<data1.length;i++){
                    y.push(data1[i].dataValues)
                }

                // console.log(data3[0].pertanyaan)

                let workbook = new excel.Workbook();
                let worksheet = workbook.addWorksheet("PTSD");
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
                    "attachment; filename=" + "PTSD.xlsx"
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