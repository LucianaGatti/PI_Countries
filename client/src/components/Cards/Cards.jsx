/* eslint-disable react/prop-types */
import Card from "../Card/Card";
import style from "./Cards.module.css";

const Cards = ({ currentCountry }) => {
  return (
    <div>
        <div className={style.div}>
            {currentCountry.map((c) => (
            <div key={c.id}>
                <Card
                    name={c.name}
                    flag={c.flags}
                    continents={c.continents}
                    id={c.id}
                />
            </div>
            ))}
        </div>
    </div>
  );
};

export default Cards;
