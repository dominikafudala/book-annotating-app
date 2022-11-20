import React from "react";
import styles from "./OptionInfo.module.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import LocationContext from "contexts/LocationContext";

const OptionInfo = ({question, action, href, left}) => {

    const context = useContext(LocationContext)

    return(
        <p className={`${styles.info} ${left ? styles.infoLeft : ""}`}>
        {question}
        <Link 
        to={"/" + href} 
        className={styles.action}
        onClick = {() =>{
            context.setLocation(
                {
                    location : "/"+href
                }
            )
        }}        
        >{action}</Link>
    </p>
    )
}
export default OptionInfo;