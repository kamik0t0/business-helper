import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../../../blocks/content/Main.jsx";
import Button from "../../../../UI/input/Button/Button";
import { modalManager } from "../../../../UI/modal/service/handlers/modal-control";
import classes from "./styles/buttons.module.css";

export default function Buttons() {
    const navigate = useNavigate();
    const goBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };

    const { setModalAdd, setModalRead, setModalUpdate, setModalDelete } =
        useContext(ModalContext);
    const [showCreateModal] = modalManager(setModalAdd),
        [showReadModal] = modalManager(setModalRead),
        [showUpdateModal] = modalManager(setModalUpdate),
        [showDeleteModal] = modalManager(setModalDelete);
    return (
        <>
            <div className={classes.buttons}>
                <Button onClick={goBack}>Выбрать</Button>
                <Button onClick={showCreateModal}>Добавить</Button>
                <Button onClick={showReadModal}>Показать</Button>
                <Button onClick={showUpdateModal}>Изменить</Button>
                <Button onClick={showDeleteModal}>Удалить</Button>
            </div>
        </>
    );
}
