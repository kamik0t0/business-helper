import classes from "./styles/modal.module.css";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { modalManager } from "./service/handlers/modal-control";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { IModalsState } from "../../blocks/content/hooks/useModals";

interface IModal {
    active: boolean;
    setActive: Dispatch<SetStateAction<IModalsState>>;
    children: ReactNode;
    size?: object;
}

const Modal: React.FC<IModal> = ({ size, active, setActive, children }) => {
    const [_, hideModal] = modalManager(setActive);

    const cx = classNames.bind(classes);
    const modalClassName = cx({
        [classes.modal]: true,
        [classes.active]: active,
    });
    const modalContentClassName = cx({
        [classes.modal__content]: true,
        [classes.active]: active,
    });
    return (
        <>
            <div className={modalClassName} onClick={hideModal}>
                <div
                    style={size}
                    className={modalContentClassName}
                    onClick={(event) => event.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </>
    );
};

export default Modal;

// Legacy
Modal.propTypes = {
    size: PropTypes.object,
    active: PropTypes.bool.isRequired,
    setActive: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};
