import PropTypes from "prop-types";
import { useContext } from "react";
import { ModalContext } from "../../../../../blocks/content/Main.jsx";
import Button from "../../../../../UI/input/Button/Button";
import { modalManager } from "../../../../../UI/modal/service/handlers/modal-control";
import { clear } from "../../../../../utils/clear";
import classes from "./styles/org-buttons.module.css";

export default function Buttons({ create }) {
    const { setModalAdd } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalAdd);

    return (
        <>
            <div className={classes.controls}>
                <Button onClick={create}>Сохранить</Button>
                <Button onClick={clear}>Очистить</Button>
                <Button onClick={hideModal}>Закрыть</Button>
            </div>
        </>
    );
}

Buttons.propTypes = {
    create: PropTypes.func.isRequired,
};
