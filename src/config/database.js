const Sequelize = require("sequelize");
const sequelize = new Sequelize("heroku_e731d5877c22f27","bb40e74f3e6d82","0c091767",{
    host:"us-cdbr-east-04.cleardb.com",
    dialect:"mysql",
    raw:true,
    define:{
        timestamps:false
    }
})

module.exports = sequelize;