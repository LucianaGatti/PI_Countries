//con validator podemos validar que al cargar una nueva actividad, estamos pasando todos los datos que hacen falta.
//si no pasamos todos los datos, arroja el nuevo error.
const validator = (req, res, next) => {
    const {name, difficulty, duration, season } = req.body;
    if(![name, difficulty, duration, season] ) throw new Error("Faltan datos por cargar")

next()
}

module.exports = validator;