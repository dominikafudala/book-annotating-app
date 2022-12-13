import React from "react";
import { NavLink} from "react-router-dom";
import styles from './Nav.module.scss';
import LocationContext from "contexts/LocationContext";
import { useContext } from "react";

const Nav = ({isLoggedIn}) => {
    const context = useContext(LocationContext);
    return(
    <nav>
        <ul className= {styles.wrapper}>
            {
                isLoggedIn && 
                <li className= {styles.navItem}>
                    <NavLink className={(navData) => (navData.isActive ? styles.navItemLinkActive + " " + styles.navItemLink : styles.navItemLink)} to = "/newBook">Home</NavLink>
                </li>
            }
            <li className= {styles.navItem}>
                <NavLink className={(navData) => (navData.isActive ? styles.navItemLinkActive + " " + styles.navItemLink : styles.navItemLink)} end to = "/" onClick={() => context.setLocation({location: "/"})}>Book search</NavLink>
            </li>
        </ul>
    </nav>
)}

export default Nav;