import React from "react";
import classes from "./styles/modal.module.css";
import { hideAnimatedModal } from "./service/handlers/modal-control.js";
import PropTypes from "prop-types";

export default function Modal({ active, setActive, children, size }) {
    return (
        <>
            <div
                className={
                    active
                        ? classes.modal + " " + classes.active
                        : classes.modal
                }
                onClick={() => hideAnimatedModal(setActive)}
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

Modal.propTypes = {
    active: PropTypes.bool.isRequired,
    setActive: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    size: PropTypes.object,
};
