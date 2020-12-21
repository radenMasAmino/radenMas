const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');

const chat = sq.define('chat',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId:{
         type:DataTypes.INTEGER,
         defaultValue:0
    },
    adminId:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    isi:{
        type:DataTypes.STRING,
    },
    userRead:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    adminRead:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
},
{
paranoid:true
});

chat.sync({ alter: true })
module.exports = chat