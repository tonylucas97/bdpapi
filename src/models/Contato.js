const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Contato = sequelize.define("contatos",{
    ddd: Sequelize.STRING,
    numero: Sequelize.STRING
})

module.exports = Contato;