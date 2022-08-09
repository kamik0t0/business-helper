import PropTypes from "prop-types";
import { useContext } from "react";
import { ModalContext } from "../../../../../../blocks/content/Main.jsx";
import Button from "../../../../../../UI/input/Button/Button.jsx";
import { modalManager } from "../../../../../../UI/modal/service/handlers/modal-control";
import classes from "./styles/delete-buttons.module.css";

export default function Buttons({ deleteOrg }) {
    const { setModalDelete } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalDelete);

    return (
        <>
            <div className={classes.controls}>
                <Button onClick={deleteOrg}>Yes</Button>
                <Button onClick={hideModal}>No</Button>
            </div>
        </>
    );
}

Buttons.propTypes = {
    deleteOrg: PropTypes.func.isRequired,
};
