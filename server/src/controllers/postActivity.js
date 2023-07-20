const { Activity, Country } = require('../db');


const createActivity = async (name, difficulty, duration, season, countryIds) => {
    const newActivity = await Activity.findOrCreate({  //busca primero la actividad, si no la encuentra, la crea.
        where: { name, difficulty, duration, season }, 
    });
    const country = await Country.findAll({ 
        where: { id: countryIds } //busco que el id de country (ARG) coincida con el countryIds con el que creé la actividad.
    });; 
    await newActivity[0].addCountry(country); 
    //findOrCreate, devuelve mucha data, para solucionar esto ponemos [0]

    return newActivity; //devuelvo el objeto creado con la nueva actividad.
}


const postActivity = async (req, res) => {

     try {
         const { name, difficulty, duration, season, countryId } = req.body; 
         const newActivity = await createActivity(name, difficulty, duration, season, countryId);
         res.status(201).json(newActivity); //si sale todo bien devuelvo la actividad creada con su status
     }
     catch (error) {
          return res.status(500).json({ error: error.message }); ;
     }
 }


module.exports = postActivity; 