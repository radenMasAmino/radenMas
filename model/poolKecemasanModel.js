const { DataTypes } = require('sequelize');
const sq = require('../connection')
const users = require('./usersModel')
const kecemasan = require('./kecemasanModel')

const poolKecemasan = sq.define('poolKecemasan',{
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

poolKecemasan.belongsTo(kecemasan)
kecemasan.hasMany(poolKecemasan)

poolKecemasan.belongsTo(users)
users.hasMany(poolKecemasan)

poolKecemasan.sync({alter:true})
module.exports= poolKecemasan