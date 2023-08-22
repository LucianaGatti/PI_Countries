const { Router } = require('express');
const postActivity = require ("../controllers/postActivity");
const getActivities = require ("../controllers/getActivities.js")
const deleteActivities = require ("../controllers/deleteActivities")
const validate = require ("./validate")



const activityRoutes = Router();

//tenemos modularizadas las rutas de actividades.
activityRoutes.post('/', validate, postActivity);
activityRoutes.get('/', getActivities)
activityRoutes.delete('/:id', deleteActivities)



module.exports = activityRoutes