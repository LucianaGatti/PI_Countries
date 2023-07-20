const axios = require("axios");
const server = require("./src/server");
const { conn } = require("./src/db");
const { Country } = require ("./src/db");
const PORT = 3001;

const url = "http://localhost:5000/countries";

const createDB = async () => {
    await axios.get(url)
      .then(resultado => {
          console.log(typeof resultado);
          // El resultado se lee con .data
          resultado.data.forEach( country => {
          console.log(country);
          // Se hace Destructuring de los datos necesarios y llenamos todos los campos con sus condicionales
          const { name: { common }, flags: {svg}, cca3, continents, capital, subregion, area, population} = country;
          let countryActual = {
            name: common,
            flags: svg ? svg : "Dont have flag",
            id: cca3,
            continents: continents[0],
            capital: capital ? capital[0] : "Dont have capital",
            subregion: subregion ? subregion : "Dont have subregion",
            area: area ? area : 0,
            population: parseInt(population),
          }
        //   console.log(countryActual); //Logea el Pais actual.
          // console.log(countryActual.flag ? "Si hay bandera" : "No hay bandera");
          Country.findOrCreate({where: countryActual});
        }
      )
    });
  };
  
  
  // Se ejecuta createDB() que extrae los datos de la API y los agrega a mi BD
  // createDB();


conn
.sync({ force: false })
.then(() => {
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
})
.catch(error => console.error(error))
