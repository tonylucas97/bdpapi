const Sequelize = require("sequelize");

const sequelize = new Sequelize("apibdp","root","55425610a",{
    host:"localhost",
    dialect:"mysql",
    raw:true,
    define:{
        timestamps:false
    }
})

module.exports = sequelize;