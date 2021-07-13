const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const EnderecoEntrega = sequelize.define("enderecos_entregas", {
    logradouro: Sequelize.STRING,
    bairro: Sequelize.STRING,
    cidade: Sequelize.STRING,
    estado: Sequelize.STRING,
    referencia: Sequelize.STRING,
    descricaoEntrega: Sequelize.STRING
});

module.exports = EnderecoEntrega;