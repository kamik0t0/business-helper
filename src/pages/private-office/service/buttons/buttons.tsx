import { FC, useContext, useMemo } from "react";
import { ModalContext } from "../../../../blocks/content/Main";
import Button from "../../../../UI/input/Button/Button";
import { modalManager } from "../../../../UI/modal/service/handlers/modal-control";
import classes from "./styles/buttons.module.css";

const Buttons: FC = () => {
    const { setModalAdd, setModalRead, setModalUpdate, setModalDelete } =
        useContext(ModalContext)!;

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
