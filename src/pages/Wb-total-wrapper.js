import React from "react";
import classes from "./Wb-total-wrapper.module.css";

export default function TotalWrapper({ children, arr }) {
    console.log(arr);
    return <div className={classes.totalWrapper}>{children}</div>;
}
