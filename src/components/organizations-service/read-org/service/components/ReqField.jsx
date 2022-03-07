import React from "react";
import classes from "./styles/req-field.module.css";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";

export default function Requisite({ requisite }) {
    return (
        <div key={uuid()}>
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

Requisite.propTypes = {
    requisite: PropTypes.object.isRequired,
};
