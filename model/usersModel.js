const { DataTypes } = require('sequelize');
const sq =  require('../connection');

const Users = sq.define('Users',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
         type:DataTypes.STRING,
         defaultValue:''
    },
    password:{
        type:DataTypes.STRING,
        defaultValue:''
    },
    role:{
        type:DataTypes.STRING,
        defaultValue:"guest"
    },
    nama:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    alamat:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    usia:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    pekerjaan:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    email:{
        type:DataTypes.STRING,
        defaultValue:""
    }
    
},
{
paranoid:true
});

Users.sync({ alter: true })
module.exports = Users