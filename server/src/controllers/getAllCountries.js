const { Country, Activity } = require("../db");


const getAllCountries = async (req, res) => {
    //buscamos el pais por nombre desde query, http://localhost:3001/countries?name=brazil por ejemplo.
    //que a su vez incluya el modelo Activity con sus atributos.
    const { name } = req.query;
    const allCountries = await Country.findAll(
        {include:
         {           
        model: Activity,
        through: {
            attributes: [],
        },
    },}
    ); 
    try {
        if (name) { 
            //si el nombre existe, hago un filtro para buscar el nombre e incluyo el name del query.
            //con el toowerCase() permito que desde el front se pueda buscar en mayus o minus
            // y se encuentre igual ya que previamente pasa todo a minúsculas.
            const country = allCountries.filter(country => country.name.toLowerCase().includes(name.toLowerCase())); 
            if (country.length) { //si country tiene longitud, es decir si encontramos algun pais, lo/s retornamos.                                                             
                return res.status(200).json(country);
            }//si ponemos mal el nombre en query, por ejemplo: argentinaaa, nos daría el error 400.
            return res.status(400).json("No se encontró el pais que estas buscando");
        }
        return res.status(200).json(allCountries); 
    } catch (error) {
        return res.status(500).json({ error: error.message }); 
    }
};


module.exports =  getAllCountries;