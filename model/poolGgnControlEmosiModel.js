const { DataTypes } = require('sequelize');
const sq = require('../config/connection')
const users = require('./usersModel')
const ggnControlEmosi = require('./ggnControlEmosiModel')

const poolGgnControlEmosi = sq.define('poolGgnControlEmosi',{
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

poolGgnControlEmosi.belongsTo(ggnControlEmosi)
ggnControlEmosi.hasMany(poolGgnControlEmosi)

poolGgnControlEmosi.belongsTo(users)
users.hasMany(poolGgnControlEmosi)

poolGgnControlEmosi.sync({alter:true})
module.exports= poolGgnControlEmosi