import React from "react";
import classes from "./styles/auth-error.module.css";
import { useTypedSelector } from "../../../../redux/hooks/hooks";

export default function AuthError() {
    const AUTHERROR = useTypedSelector((state) => state.authErrorReducer);
    console.log(AUTHERROR);
    return (
        <>
            {typeof AUTHERROR.message === "string" && (
                <div
                    className={
                        AUTHERROR.isInvalid
                            ? classes.login_incorrect
                            : classes.login_incorrect_none
                    }
                >
                    {AUTHERROR.message}
                </div>
            )}
        </>
    );
}
