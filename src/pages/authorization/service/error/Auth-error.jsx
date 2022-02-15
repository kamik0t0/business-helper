import React from "react";
import classes from "./styles/auth-error.module.css";
import PropTypes from "prop-types";

export default function AuthError({ isInvalid }) {
    console.log(typeof isInvalid);
    return (
        <>
            {typeof isInvalid.result === "string" && (
                <div
                    className={
                        isInvalid.isInvalid
                            ? classes.login_incorrect
                            : classes.login_incorrect_none
                    }
                >
                    {isInvalid.result}
                </div>
            )}
        </>
    );
}

AuthError.propTypes = {
    isInvalid: PropTypes.object.isRequired,
};
