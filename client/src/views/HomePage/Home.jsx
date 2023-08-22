
import style from './Home.module.css'
import {getAllCountries, getAllActivities, filterByContinent} from '../../redux/actions'
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Cards from '../../components/Cards/Cards';
import Paginate from "../../components/Paginate/Paginate"


const Home = () => {

    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries);
    const activities = useSelector(state => state.activities);
    
  

    useEffect(() => {
        if (!countries.length) { //vemos si el estado de paises está vacio, en ese caso queremos obtenerlos
            dispatch(getAllCountries()); //hacemos dispatch para obtener los paises de la api que se encuentra en la funcion getallcountries
        }
        dispatch(getAllActivities());
    }, [dispatch, countries.length]); //el array de dependencias indica que depende de la funcion dispatch y de la long de paises.

    //FILTROS Y ORDENAMIENTOS.
    //const [isLoading, setIsLoading] = useState(false);

    const [filters, setFilters] = useState({ //creamos un estado local para almacenar los filtros
        orderBy: "All", //con el all en todos los campos queremos decir que no hay criterios de filtros aplicados.
        orderByPop: "All",
        filter: "All",
        filterBy: "All",
    });


    const filteredCountries = countries
    
    //! Filtrar por actividad
        .filter(country => {
            if (filters.filter !== "All") {
                return country.Activities.some(activity => activity.name === filters.filter);
            }
            //! Filtrar por continente
            if (filters.filterBy !== "All") {
                return country.continents === filters.filterBy;
            }
            return true; // Si no se seleccionó ningún filtro, mostrar todos los países
        })

        .sort((a, b) => {
            // Ordenar por población
            if (filters.orderByPop === "asc") {
                if (a.population < b.population) return 1;
                if (a.population > b.population) return -1;
                // Si tienen la misma población, comparar por nombre
                return a.name.localeCompare(b.name);
            } else if (filters.orderByPop === "des") {
                if (a.population > b.population) return 1;
                if (a.population < b.population) return -1;
                // Si tienen la misma población, comparar por nombre
                return a.name.localeCompare(b.name);
            }

            // Ordenar por nombre
            if (filters.orderBy === "asc") {
                return a.name.localeCompare(b.name);
            } else if (filters.orderBy === "des") {
                return b.name.localeCompare(a.name);
            } else {
                return 0; // Si no se seleccionó ningún ordenamiento por nombre, no cambiar el orden de los países
            }
        });

    const handleOrderByName = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        setFilters({ ...filters, orderBy: e.target.value });
    };

    const handleOrderByPopulation = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        setFilters({ ...filters, orderByPop: e.target.value });
    };


    const handleFilterByActivities = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        setFilters({ ...filters, filter: e.target.value });
    };

    const handleFilterByContinent = (e) => {
        e.preventDefault();
        dispatch(filterByContinent(e.target.value))
        setCurrentPage(1);
        setFilters({ ...filters, filterBy: e.target.value });
    };

    const handleAllCountries = () => {
        setFilters({
            orderBy: "All",
            orderByPop: "All",
            filter: "All",
            filterBy: "All",

        })
        dispatch(getAllCountries());
        setCurrentPage(1);

    };

    //!PAGINATE. 
    //el valor inicial de currentPage es 1, ya que es la primer pagina.
    const [currentPage, setCurrentPage] = useState(1);

    //el valor inicial de countriesPerPage es 10, la cantidad de paises que queremos mostrar por pagina
    const [countriesPerPage, setCountriesPerPage] = useState(10);

    /*indexLastCountry guarda el indice del ultimo pais que se muestra en la pagina actual
    se multiplica la pagina actual * la cantidad de paises en la pagina
    ejemplo, estamos en la pagina 2, el indice del ultimo pais sería 19.
    */
    const indexLastCountry = currentPage * countriesPerPage;

        /*indexFirstCountry guarda el indice del primer pais que se muestra en la pagina actual
    se calcula restando al indice del ultimo pais, el numero de paises por página.
    ejemplo, estamos en la pagina 2, el indice del primer pais sería 10. 

    hay que tener en cuenta que el primer país de la primer página tiene indice 0.
    */
    const indexFirstCountry = indexLastCountry - countriesPerPage;

    /* creamos currentCountry, donde guardamos un array con los paises que vamos a mostrar en la pagina actual
    el slice se aplica sobre los paises filtrados por el usuario (con o sin filtro aplicado), recibe como argumento
    el primer y ultimo indice y nos devuelve un nuevo array con los elementos entre esos indices.
    ejemplo, si filteredCountry tiene 50 paises, currentCountry va a tener los primeros 10 paises.
     */
    const currentCountry = filteredCountries.slice(indexFirstCountry, indexLastCountry);


    //esta funcion nos va a permitir cambiar de pagina cuando le demos click a siguiente
    function nextHandler() {
        //guardamos el numero total de paises
        const allCountries = countries.length;
        //guardamos el valor de la pagina actual en nextPage
        const nextPage = currentPage;
        //guardamos el index del primer pais de la siguiente pagina
        const firstIndex = nextPage * countriesPerPage;
        //si no hay mas paises despues del firstIndex, es decir no hay mas paginas siguientes, retornamos para salir de la fn
        if (firstIndex >= allCountries) return;
        //si hay mas paises, cambiamos la pagina actual a la siguiente.
        setCurrentPage(currentPage + 1);
    }
        //esta funcion nos va a permitir cambiar de pagina cuando le demos click a anterior
    function prevHandler() {
        //guardamos el valor de la pagina actual - 1, para saber si hay paginas anteriores.
        const prevPage = currentPage - 1;
        //si prevPage es menor que cero significa que no hay paginas anteriores a la actual.
        if (prevPage <= 0) return;
        //si hay anteriores, usamos setCurrentPage para actualizar la pagina actual con el valor de prevPage, que sería la anterior.
        setCurrentPage(prevPage);
    }
        //esta función sirve para cambiar la pagina actual al numero que seleccionamos de la lista desordenada
    const paginated = (pageNumber) => {
        //al dar clic se actualiza la pagina actual con el valor de pageNumber
        setCurrentPage(pageNumber);
    };




    return ( 
        
        <div className={style.div}>
                            
            <div className={style.filters}>
                                            {/*  FILTROS POR CONTINENTES.  */}
                <select className={style.select} name="Filter by Continents" id='Filter by Continents' value={filters.continents} onChange={(e) => handleFilterByContinent(e)}>
                    <option className={style.allContinents} value='All'>All Continents</option>
                    <option value='Antarctica'>Antarctica</option>
                    <option value='North America'>North America</option>
                    <option value='South America'>South America</option>
                    <option value='Asia'>Asia</option>
                    <option value='Europe'>Europe</option>
                    <option value='Africa'>Africa</option>
                    <option value='Oceania'>Oceania</option>
                </select>
                                            {/*  ORDENAMIENTO POR NOMBRE.  */}
                <select className={style.select} name='Order by name' value={filters.name} onChange={(e) => handleOrderByName(e)}>
                    <option value="All">Order by Name</option>
                    <option value='asc'>A / Z</option>
                    <option value='des'>Z / A</option>
                </select>
                                            {/*  ORDENAMIENTO POR HABITANTES.  */}
                <select className={style.select}  name="Order by population" id='Order by population' value={filters.orderByPop} onChange={(e) => handleOrderByPopulation(e)}>
                    <option value="All">Order by Population</option>
                    <option value='asc'>+ / -</option>
                    <option value='des'>- / +</option>
                </select>

                                            {/*  FILTRO POR ACTIVIDADES.  */}
                <select className={style.select} name="Filter by Activities" id='Filter by Activities' value={filters.filter} onChange={(e) => handleFilterByActivities(e)}>
                    <option value="All">Filter by Activities</option>
                    {activities.map((a) => (
                        <option value={a.name} key={a.id}>{a.name}</option>
                    ))}
                </select>
                                            {/*  LIMPIAR FILTROS Y ORDENAMIENTOS.  */}
                <button className={style.reset} onClick={(e) => handleAllCountries(e.target.value)}>Clean Filters</button>
            </div>
            <div>
                <div>
                <Cards currentCountry={currentCountry} />

                </div>
                <Paginate paginated={paginated}
                    allCountries={filteredCountries.length}
                    countriesPerPage={countriesPerPage}
                    currentPage={currentPage}
                    nextHandler={nextHandler}
                    prevHandler={prevHandler} />
            </div>
        </div >
    )
}
export default Home;