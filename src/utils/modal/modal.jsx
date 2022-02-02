import React from "react";
import classes from "./modal.module.css";

export default function Modal({ active, setActive, children, size }) {
    return (
        <>
            <div
                className={
                    active
                        ? classes.modal + " " + classes.active
                        : classes.modal
                }
                onClick={() => setActive(false)}
            >
                <div
                    style={size}
                    className={
                        active
                            ? classes.modal__content + " " + classes.active
                            : classes.modal__content
                    }
                    onClick={(event) => event.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </>
    );
}
