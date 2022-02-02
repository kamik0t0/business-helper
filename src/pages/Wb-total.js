import React from "react";
import classes from "./wb-total.module.css";

export default function Total({ array, field, name, total }) {
    return (
        <div className={classes.total}>
            <div className={classes.total_name}>{name}</div>
            <div className={classes.total_value}>
                {total(array, field).toFixed(2)}
            </div>
        </div>
    );
}
