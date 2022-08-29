const Sequelize=require('sequelize')

const sequelize= new Sequelize('node-complete','root','NikShapa99',{
    host:'localhost',
    dialect:'mysql'
});

module.exports=sequelize;
