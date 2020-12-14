const { DataTypes } = require('sequelize');
const sq = require('../config/connection')
const users = require('./usersModel')
const depresi = require('./depresiModel')

const poolDepresi = sq.define('poolDepresi',{
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

poolDepresi.belongsTo(depresi)
depresi.hasMany(poolDepresi)

poolDepresi.belongsTo(users)
users.hasMany(poolDepresi)

poolDepresi.sync({alter:true})
module.exports= poolDepresi