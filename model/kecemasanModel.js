const { DataTypes } = require('sequelize');
const sq =  require('../connection');

const kecemasan = sq.define('Kecemasan',{
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