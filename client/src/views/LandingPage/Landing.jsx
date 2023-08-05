import style from "./Landing.module.css";
import { Link } from "react-router-dom";

const landingPage = () => {
  return (
    <div className={style.div}>
      <div >
        <h1 className={style.travel}>TRAVEL</h1>
      </div>

      <div>
        <h1 className={style.countries}>COUNTRIES</h1>
      </div>
      <div>
        <Link to="/home">
          <button className={style.button}>START</button>
        </Link>
      </div>
    </div>
  );
};

export default landingPage;
