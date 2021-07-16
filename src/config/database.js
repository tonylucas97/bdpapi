const Sequelize = require("sequelize");
const sequelize = new Sequelize("heroku_d2625a7e5a9dafb","b2408d93b0076d","174e3a1b",{
    host:"us-cdbr-east-04.cleardb.com",
    dialect:"mysql",
    raw:true,
    define:{
        timestamps:false
    }
})

module.exports = sequelize;