import PropTypes from "prop-types";
import { useContext } from "react";
import { ModalContext } from "../../../../../../blocks/content/Main.jsx";
import MyButton from "../../../../../../UI/input/MyButton/MyButton.jsx";
import { modalManager } from "../../../../../../UI/modal/service/handlers/modal-control";
import classes from "./styles/delete-buttons.module.css";

export default function Buttons({ deleteOrg }) {
    const { setModalDelete } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalDelete);

    return (
        <>
            <div className={classes.controls}>
                <MyButton onClick={deleteOrg}>Yes</MyButton>
                <MyButton onClick={hideModal}>No</MyButton>
            </div>
        </>
    );
}

Buttons.propTypes = {
    deleteOrg: PropTypes.func.isRequired,
};
