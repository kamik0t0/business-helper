import React from "react";
import classes from "./styles/total.module.css";

export function Total({ array, field, name, total }) {
    return (
        <div className={classes.total}>
            <div className={classes.total_name}>{name}</div>
            <div className={classes.total_value}>
                {total(array, field).toFixed(2)}
            </div>
        </div>
    );
}

export function TotalWrapper({ children, arr }) {
    console.log(arr);
    return <div className={classes.totalWrapper}>{children}</div>;
}
