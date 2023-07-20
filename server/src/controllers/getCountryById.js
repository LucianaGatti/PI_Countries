const { Country, Activity } = require("../db");

const getCountryById = async (req, res) => {
    try {
      //accedemos al id por params, http://localhost:3001/countries/BRA por ejemplo.
      const { id } = req.params;
      // console.log(id);
      //le aplicamos un findByPk para que busque justamente por id, y que nos muestre toda la info 
      //del pais con las actividades que se pueden hacer. si ponemos mal el id, o no existe, nos retorna el 404.
      const country = await Country.findByPk(id, {
        include: {
          model: Activity,
          through: {
            attributes: [],
        },
        },
      });
      if(country)
      return res.status(200).json(country);
      else return res.status(404).json({ error: "País no encontrado" })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  };

  module.exports =  getCountryById