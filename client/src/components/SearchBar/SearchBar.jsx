
import style from "./SearchBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../redux/actions";

const SearchBar = (props) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const handleInputChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
        // console.log(name);
    };

    const handleBtnChange = (event) => {
        event.preventDefault();
        dispatch(getCountriesByName(name))
        setName("");
    }

    const handleClick = (event) => {
        setName("");
    }

    return ( 
        <div>
    <nav className={style.div}>
        <input className={style.input}
        type="text"
        placeholder="search countres"
        onChange={(event) => handleInputChange(event)}
        value={name}
        ></input>

        <button 
        className={style.search}
        onClick={(event) => handleBtnChange(event)}
        type="submit"></button>
    </nav> 
    </div>
    );
}
 
export default SearchBar;