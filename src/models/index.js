const sequelize = require("../utils/connection");
const Fruta = require("./Fruta");
const FrutaLote = require("./FrutaLote");
const Lote = require("./Lote");


// Asociaciones muchos a muchos


// Si Productor usa Model.init, entonces sí necesitas esta línea


module.exports = {
    Fruta,
    Lote,
    FrutaLote
};