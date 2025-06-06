const { getAll, create, getOne, remove, update } = require('../controllers/Productor.controllers');
const express = require('express');

const routerProductor = express.Router();

routerProductor.route('/productor')
    .get(getAll)
    .post(create);

routerProductor.route('/productor/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerProductor;