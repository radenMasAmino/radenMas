const { DataTypes } = require('sequelize');
const sq = require('../config/connection')
const users = require('./usersModel')
const ggnBelajar = require('./ggnBelajarModel')

const poolGgnBelajar = sq.define('poolGgnBelajar',{
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

poolGgnBelajar.belongsTo(ggnBelajar)
ggnBelajar.hasMany(poolGgnBelajar)

poolGgnBelajar.belongsTo(users)
users.hasMany(poolGgnBelajar)

poolGgnBelajar.sync({alter:true})
module.exports= poolGgnBelajar