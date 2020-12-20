const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');

const chat = sq.define('users',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId:{
         type:DataTypes.STRING,
         defaultValue:''
    },
    adminId:{
        type:DataTypes.STRING,
        defaultValue:''
    },
    isi:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    userRead:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    adminRead:{
        type:DataTypes.INTEGER,
        defaultValue:1
    },
},
{
paranoid:true
});

chat.sync({ alter: true })
module.exports = chat