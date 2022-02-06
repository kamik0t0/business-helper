import React from "react";
import classes from "./hint.module.css";

export default function Hint({ elem, children }) {
    return (
        <>
            <div>{children}</div>
        </>
    );
}
