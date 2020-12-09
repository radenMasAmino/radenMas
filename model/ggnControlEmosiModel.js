const { DataTypes } = require('sequelize');
const sq =  require('../connection');

const ggnControlEmosi = sq.define('ggnControlEmosi',{
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

ggnControlEmosi.sync({ alter: true })
module.exports = ggnControlEmosi