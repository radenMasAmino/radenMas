const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');

const depresi = sq.define('depresi',{
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

depresi.sync({ alter: true })
module.exports = depresi