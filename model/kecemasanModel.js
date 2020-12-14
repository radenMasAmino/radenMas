const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');

const kecemasan = sq.define('kecemasan',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pertanyaan:{
         type:DataTypes.STRING,
         defaultValue:''
    },
    descending:{
        type:DataTypes.INTEGER
    }
},
{
paranoid:true
    }
);

kecemasan.sync({ alter: true })
module.exports = kecemasan