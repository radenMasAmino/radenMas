const { DataTypes } = require('sequelize');
const sq =  require('../connection');

const penyakit = sq.define('Penyakit',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    namaPenyakit:{
         type:DataTypes.STRING,
         defaultValue:''
    }
},
);

penyakit.sync({ alter: true })
module.exports = penyakit