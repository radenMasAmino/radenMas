const { DataTypes } = require('sequelize');
const sq =  require('../connection');

const ptsd = sq.define('PTSD',{
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

ptsd.sync({ alter: true })
module.exports = ptsd