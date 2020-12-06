const { DataTypes } = require('sequelize');
const sq =  require('../connection');

const srq = sq.define('SRQ',{
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

srq.sync({ alter: true })
module.exports = srq