import React from "react";
import classes from "./auth-error.module.css";

export default function AuthError({ isInvalid }) {
    return (
        <div
            className={
                isInvalid.isInvalid
                    ? classes.login_incorrect
                    : classes.login_incorrect_none
            }
        >
            {isInvalid.result}
        </div>
    );
}
