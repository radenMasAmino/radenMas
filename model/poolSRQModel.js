const { DataTypes } = require('sequelize');
const sq = require('../connection')
const users = require('./usersModel')
const SRQ = require('./SRQModel')

const poolSRQ = sq.define('poolSRQ',{
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

poolSRQ.belongsTo(SRQ)
SRQ.hasMany(poolSRQ)

poolSRQ.belongsTo(users)
users.hasMany(poolSRQ)

poolSRQ.sync({alter:true})
module.exports= poolSRQ