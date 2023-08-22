/* eslint-disable react/prop-types */
import Card from "../Card/Card";
import style from "./Cards.module.css";

const Cards = ({ currentCountry }) => {
  return (
    <div>
        <div className={style.div}>
            {currentCountry.map((country) => (
              <div key={country.id}>
              <Card
                    name={country.name}
                    flag={country.flags}
                    continents={country.continents}
                    id={country.id}
                />
            </div>
            ))}
        </div>
    </div>
  );
};

export default Cards;
