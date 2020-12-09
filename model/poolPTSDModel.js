const { DataTypes } = require('sequelize');
const sq = require('../connection')
const users = require('./usersModel')
const ptsd = require('./ptsdModel')

const poolPTSD = sq.define('poolPTSD',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    jawaban:{
         type:DataTypes.STRING,
         defaultValue:0
    },
    point :{
        type:DataTypes.INTEGER,
        defaultValue:0
    }
})

poolPTSD.belongsTo(ptsd)
ptsd.hasMany(poolPTSD)

poolPTSD.belongsTo(users)
users.hasMany(poolPTSD)

poolPTSD.sync({alter:true})
module.exports= poolPTSD