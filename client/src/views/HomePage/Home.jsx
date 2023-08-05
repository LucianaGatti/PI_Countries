import style from './Home.module.css'
import {getAllCountries, getAllActivities, filterByContinent} from '../../redux/actions'
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Cards from '../../components/Cards/Cards';
import Paginate from "../../components/Paginate/Paginate"


const home = () => {

    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries);
    const activities = useSelector(state => state.activities);
    

    useEffect(() => {
        if (!countries.length) {
            dispatch(getAllCountries());
        }
        dispatch(getAllActivities());
    }, [dispatch, countries.length]);

    //FILTROS Y ORDENAMIENTOS.
    //const [isLoading, setIsLoading] = useState(false);

    const [filters, setFilters] = useState({
        orderBy: 'All',
        orderByPop: 'All',
        filter: 'All',
        filterBy: 'All',
    });


    const filteredCountries = countries
    
        .filter(country => {
            //! Filtrar por actividad
            if (filters.filter !== 'All') {
                return country.Activities.some(activity => activity.name === filters.filter);
            }
            // Filtrar por continente
            if (filters.filterBy !== 'All') {
                return country.continents === filters.filterBy;
            }
            return true; // Si no se seleccionó ningún filtro, mostrar todos los países
        })

        .sort((a, b) => {
            // Ordenar por población
            if (filters.orderByPop === 'asc') {
                if (a.population < b.population) return 1;
                if (a.population > b.population) return -1;
                // Si tienen la misma población, comparar por nombre
                return a.name.localeCompare(b.name);
            } else if (filters.orderByPop === 'des') {
                if (a.population > b.population) return 1;
                if (a.population < b.population) return -1;
                // Si tienen la misma población, comparar por nombre
                return a.name.localeCompare(b.name);
            }

            // Ordenar por nombre
            if (filters.orderBy === 'asc') {
                return a.name.localeCompare(b.name);
            } else if (filters.orderBy === 'des') {
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
        //setIsLoading(true);
        e.preventDefault();
        setCurrentPage(1);
        setFilters({ ...filters, filter: e.target.value });
        //setIsLoading(false);
    };

    const handleFilterByContinent = (e) => {
        e.preventDefault();
        dispatch(filterByContinent(e.target.value))
        setCurrentPage(1);
        setFilters({ ...filters, filterBy: e.target.value });
    };

    const handleAllCountries = () => {
        setFilters({
            orderBy: 'All',
            orderByPop: 'All',
            filter: 'All',
            filterBy: 'All',

        })
        dispatch(getAllCountries());
        setCurrentPage(1);

    };

    //!PAGINATION. 
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(10);
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountry = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

    function nextHandler() {
        const totalCountries = countries.length;
        const nextPage = currentPage;
        const firstIndex = nextPage * countriesPerPage;
        if (firstIndex >= totalCountries) return;

        setCurrentPage(currentPage + 1);
    }

    function prevHandler() {
        const prevPage = currentPage - 1;
        if (prevPage < 0) return;
        setCurrentPage(prevPage);
    }

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    //!PAGINATION. 




    return ( 

        <div className={style.div}>
                            
            <div className={style.filters}>
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

                <select className={style.select} name='Order by name' value={filters.name} onChange={(e) => handleOrderByName(e)}>
                    <option value="All">Order by Name</option>
                    <option value='asc'>A / Z</option>
                    <option value='des'>Z / A</option>
                </select>

                <select className={style.select}  name="Order by population" id='Order by population' value={filters.orderByPop} onChange={(e) => handleOrderByPopulation(e)}>
                    <option value="All">Order by Population</option>
                    <option value='asc'>+ / -</option>
                    <option value='des'>- / A</option>
                </select>


                <select className={style.select} name="Filter by Activities" id='Filter by Activities' value={filters.filter} onChange={(e) => handleFilterByActivities(e)}>
                    <option value="All">Activities</option>
                    {activities.map((a) => (
                        <option value={a.name} key={a.id}>{a.name}</option>
                    ))}
                </select>

                <button className={style.reset} onClick={(e) => handleAllCountries(e.target.value)}>Clean Filters</button>
            </div>

            <div className={style.mainContent}>
                <div className={style.results}>
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
export default home;