const { Router } = require('express');
const getAllCountries = require ("../controllers/getAllCountries");
const getCountryById = require ("../controllers/getCountryById")


const countriesRoutes = Router();


countriesRoutes.get('/', getAllCountries);
countriesRoutes.get('/:id', getCountryById);


module.exports = countriesRoutes;