const { Router } = require('express');
const  postActivity = require ("../controllers/postActivity");
const getActivities = require ("../controllers/getActivities.js")
const deleteActivities = require ("../controllers/deleteActivities")

const activityRoutes = Router();

//con validator podemos validar que al cargar una nueva actividad, estamos pasando todos los datos que hacen falta.
//si no pasamos todos los datos, arroja el nuevo error.
const validator = (req, res, next) => {
    const {name, difficulty, duration, season } = req.body;
    if(![name, difficulty, duration, season] ) throw new Error("Faltan datos por cargar")

next()
}
//tenemos modularizadas las rutas de actividades.
activityRoutes.post('/', validator, postActivity);
activityRoutes.get('/', getActivities)
activityRoutes.delete('/:id', deleteActivities)



module.exports = activityRoutes