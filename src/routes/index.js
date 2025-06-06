const { Router } = require('express');
const routerProductor = require('./Productor.routes');
const routerFinca = require('./finca.routes');
const routerLote = require('./lote.routes');
const routerCertica = require('./certica.routes');
const routerTipofruta = require('./tipofruta.routes');
const routerRemision = require('./remision.routes');
const routerFruta = require('./fruta.routes');

const router = Router();

// colocar las rutas aquí
router.use('/', routerProductor);
router.use('/', routerFinca);
router.use('/', routerLote);
router.use('/', routerCertica);
router.use('/', routerTipofruta);
router.use('/', routerRemision);
router.use('/', routerFruta);

module.exports = router;