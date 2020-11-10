const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('radenmas', 'sideku', 'Sideku132', {
    host: '147.139.169.33',
    port: 5432,
    dialect: 'postgres',
    logging:false
  });

  module.exports =  sequelize;