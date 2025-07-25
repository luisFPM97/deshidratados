const { Router } = require('express');
const routerProductor = require('./Productor.routes');
const routerFinca = require('./finca.routes');
const routerLote = require('./lote.routes');
const routerCertica = require('./certica.routes');
const routerTipofruta = require('./tipofruta.routes');
const routerRemision = require('./remision.routes');
const routerFruta = require('./fruta.routes');
const routerSeleccion = require('./seleccion.routes');
const routerTrazabilidad = require('./trazabilidad.routes');
const routerEmbarque = require('./embarque.routes');
const routerTipoPresentacion = require('./tipopresentacion.routes');
const routerPresentacion = require('./presentacion.routes');
const routerEmbalaje = require('./embalaje.routes');
const routerGGN = require('./ggn.routes');
const routerFactura = require('./factura.routes');

const router = Router();

// colocar las rutas aquí
router.use('/', routerProductor);
router.use('/', routerFinca);
router.use('/', routerLote);
router.use('/', routerCertica);
router.use('/', routerTipofruta);
router.use('/', routerRemision);
router.use('/', routerFruta);
router.use('/', routerSeleccion);
router.use('/', routerTrazabilidad);
router.use('/', routerEmbarque);
router.use('/', routerTipoPresentacion);
router.use('/', routerPresentacion);
router.use('/', routerEmbalaje);
router.use('/', routerGGN);
router.use('/', routerFactura);

module.exports = router;