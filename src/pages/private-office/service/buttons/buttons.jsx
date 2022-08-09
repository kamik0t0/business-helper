import { useContext, useMemo } from "react";
import { ModalContext } from "../../../../blocks/content/Main.jsx";
import Button from "../../../../UI/input/Button/Button.jsx";
import { modalManager } from "../../../../UI/modal/service/handlers/modal-control";
import classes from "./styles/buttons.module.css";

const Buttons = () => {
    const { setModalAdd, setModalRead, setModalUpdate, setModalDelete } =
        useContext(ModalContext);

    const [showCreateModal] = modalManager(setModalAdd),
        [showReadModal] = modalManager(setModalRead),
        [showUpdateModal] = modalManager(setModalUpdate),
        [showDeleteModal] = modalManager(setModalDelete);

    return useMemo(() => {
        return (
            <div className={classes.buttons}>
                <Button onClick={showCreateModal}>Добавить</Button>
                <Button onClick={showReadModal}>Показать</Button>
                <Button onClick={showUpdateModal}>Изменить</Button>
                <Button onClick={showDeleteModal}>Удалить</Button>
            </div>
        );
    }, []);
};

export default Buttons;
