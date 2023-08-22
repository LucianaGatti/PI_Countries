import { getCountriesById } from "../../redux/actions";
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
        // console.log(id)
        dispatch(getCountriesById(id));
    }, [dispatch, id]);


    return (
    <div className={style.div}>
            {Object.keys(detailCountry).length > 0 ?
        <div className={style.contain}>
                <div className={style.detail}>
                    <h1 className={style.name}> {detailCountry.name}</h1>
                    <h2 className={style.info}> Id: <p className={style.infoP}> {detailCountry.id} </p></h2>
                    <h2 className={style.info}> Continent: <p className={style.infoP}> {detailCountry.continents}</p> </h2>
                    <h2 className={style.info}>Capital: <p className={style.infoP}>{detailCountry.capital ? detailCountry.capital : 'There is no capital'} </p></h2>
                    
                    <h2 className={style.info}>Area: <p className={style.infoP}> {detailCountry.area} Km2 </p></h2>
                    <h2 className={style.info}>Population: <p className={style.infoP}>{detailCountry.population}</p></h2> 
                    <h2 className={style.info}>Activities: {detailCountry.Activities.length > 0 ?
    <div>
        {detailCountry.Activities.map(Activities => (
                    <p className={style.infoP} key={Activities.id}>{Activities.name}</p>
        ))}
    </div>
    : <p>No activities found</p>
}</h2>
                </div>
                   <img className={style.flag} src={detailCountry.flags} /> 
        </div>
                : <p> Loading</p>
            }

    </div>
    )
}
export default Detail

