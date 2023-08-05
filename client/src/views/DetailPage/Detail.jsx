import { Clean, /* deleteActivity */ getCountriesById } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import style from './Detail.module.css';

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const detailCountry = useSelector((state) => {

        return state.countriesDetail;
    });

    useEffect(() => {
        console.log(id)
        dispatch(getCountriesById(id));
        return () => {
            dispatch(Clean("detail"))
        }
    }, [dispatch, id]);


    return (
    <div className={style.div}>
            {Object.keys(detailCountry).length > 0 ?
        <div className={style.contain}>
                <div className={style.detail}>
                    <h1 className={style.name}>{detailCountry.name}</h1>
                    <h2 className={style.info}> Id: {detailCountry.id} </h2>
                    <h2 className={style.info}> Continent: {detailCountry.continents} </h2>
                    <h2 className={style.info}>Capital: {detailCountry.capital ? detailCountry.capital : 'There is no capital'}</h2>
                    
                    <h2 className={style.info}>Subregion: {detailCountry.subregion ? detailCountry.subregion : "There is no subregion"}</h2>
                    <h2 className={style.info}>Area: {detailCountry.area} Km2</h2>
                    <h2 className={style.info}>Population:{detailCountry.population}</h2> 
                </div>
                   <img className={style.flag} src={detailCountry.flags} /> 
        </div>
                : <p> Loading</p>
            }

    </div>
    )
}
export default Detail