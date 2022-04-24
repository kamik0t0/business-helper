import React from "react";
import classes from "./styles/modal.module.css";
import { hideAnimatedModal } from "./service/handlers/modal-control.js";
import PropTypes from "prop-types";

export default function Modal({ size, active, setModal, children }) {
    return (
        <>
            <div
                className={
                    active
                        ? classes.modal + " " + classes.active
                        : classes.modal
                }
                onClick={() => hideAnimatedModal(setModal)}
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
    setModal: PropTypes.func.isRequired,
    size: PropTypes.object,
    children: PropTypes.element.isRequired,
};
