
import style from "./Nav.module.css"
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";


const NavBar = () => {
  return (
    <nav className={style.navBar}>
      <ul className={style.list}>
        <li className={style.item}>
          <Link to="/home">
            <button className={style.home}>Home</button>
          </Link>
        </li>
        <li className={style.item}>
          <Link to="activities">
            <button className={style.activity}>Create activity</button>
          </Link>
        </li>
        <li className={style.item}>
          <SearchBar />
        </li>
        <li className={style.item}>
          <Link to="/">
            <button className={style.exit}>Exit</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
 
export default NavBar;