const { DataTypes } = require('sequelize'); 
const { sequelize } = require('../config/db');

const User=sequelize.define('User',{
    fullName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    mobile:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    dob:{
        type:DataTypes.DATEONLY,
        allowNull:false
    }

})

module.exports = User;
