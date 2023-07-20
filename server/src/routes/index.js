const { Router } = require("express");
const router = Router();

const countryRoutes = require("./countryRoutes")
const activityRoutes = require("./activityRoutes")

//tenemos modularizadas tanto las rutas de countries como de activitys, cada una con sus
//tipo de peticiones.

router.use('/countries', countryRoutes);
router.use('/activity', activityRoutes);


module.exports = router;
