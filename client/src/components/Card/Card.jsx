import style from "./Card.module.css"
import {Link} from "react-router-dom"



const Card = (countries) => {

    return ( 
    <div className={style.div}>
        <div className={style.card}>
                <h2 className={style.name}>{countries.name}</h2>

                <img className={style.img} src={countries.flag} alt='Flag' />

                <h3 className={style.continents}> {countries.continents}</h3>
                
                <Link to={`/home/${countries.id}`} className="linkCard">
                    <button className={style.button}> + Info</button>
                </Link>
            </div>

    </div> 
    );
}
 
export default Card;