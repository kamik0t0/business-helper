import React from "react";
import classes from "./styles/req-field.module.css";

export default function Requisite({ requisite }) {
    return (
        <div key={requisite.value}>
            {requisite.value !== "null" && (
                <div className={classes.content}>
                    <div className={classes.requisit_name}>
                        {requisite.name}
                    </div>
                    <div className={classes.requisit_value}>
                        {requisite.value}
                    </div>
                </div>
            )}
        </div>
    );
}
