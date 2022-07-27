import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./styles/buttons.module.css";
import MyButton from "../../../../UI/input/MyButton/MyButton.jsx";
import { ModalContext } from "../../../../blocks/content/Main.jsx";
import { modalManager } from "../../../../UI/modal/service/handlers/modal-control";

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
                <MyButton onClick={goBack}>Выбрать</MyButton>
                <MyButton onClick={showCreateModal}>Добавить</MyButton>
                <MyButton onClick={showReadModal}>Показать</MyButton>
                <MyButton onClick={showUpdateModal}>Изменить</MyButton>
                <MyButton onClick={showDeleteModal}>Удалить</MyButton>
            </div>
        </>
    );
}
