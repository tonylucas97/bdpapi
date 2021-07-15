const sequelize = require("../config/database");
const Admin = require("./Admin");
const Mercadoria = require("./Mercadoria");
const Nota = require("./Nota");
const Venda = require("./Venda");
const Usuario = require("./Usuario");
const Endereco = require("./Endereco")
const Contato = require("./Contato");

Admin.hasMany(Nota);
Nota.belongsTo(Admin);
Nota.hasMany(Venda);
Venda.belongsTo(Nota);
Mercadoria.hasMany(Venda);
Venda.belongsTo(Mercadoria);
Usuario.hasMany(Endereco)
Endereco.belongsTo(Usuario)
Usuario.hasMany(Contato)
Contato.belongsTo(Usuario)

sequelize.sync({force:false})
