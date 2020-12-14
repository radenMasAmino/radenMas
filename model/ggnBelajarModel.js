const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');

const ggnBelajar = sq.define('ggnBelajar',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pertanyaan:{
         type:DataTypes.STRING,
         defaultValue:''
    }
},
{
paranoid:true
}
);

ggnBelajar.sync({ alter: true })
module.exports = ggnBelajar