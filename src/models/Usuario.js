const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Usuario = sequelize.define("usuarios",{
    nome:Sequelize.STRING,
    usuario: Sequelize.STRING,
    senha:Sequelize.STRING,
    email: Sequelize.STRING,
})

module.exports = Usuario;