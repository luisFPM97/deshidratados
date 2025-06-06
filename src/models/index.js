const sequelize = require("../utils/connection");

const Productor = require("./Productor");

Productor.init(sequelize);

module.exports = {
    Productor
}