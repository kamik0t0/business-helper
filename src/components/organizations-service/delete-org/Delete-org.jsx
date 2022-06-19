import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./styles/delete-org.module.css";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";
import { ModalContext } from "../../../blocks/content/Main.jsx";
import { modalManager } from "../../../UI/modal/service/handlers/modal-control.js";
import Buttons from "./service/components/delete-buttons/Delete-buttons.jsx";
import { useDeleteOrg } from "./service/hooks/useDeleteOrg.js";
import { MyOrg } from "../../../redux/setMyOrg-reducer.js";

export default function DeleteOrg() {
    const dispatch = useDispatch();
    const MYORG = useSelector(MyOrg);

    const [loader, deleteOrg] = useDeleteOrg(MYORG.id, MYORG.UserId);
    const { setModalDelete } = useContext(ModalContext);

    const [, hideModal] = modalManager(setModalDelete);
    const del = (event) => dispatch(deleteOrg(event));

    return (
        <>
            {Object.keys(MYORG).length === 0 ? (
                <div className={classes.noorg}>
                    <div className={classes.noorg__text}>
                        Организация не выбрана
                    </div>
                    <MyButton onClick={hideModal}>Закрыть</MyButton>
                </div>
            ) : (
                <div className={classes.delete}>
                    <div
                        className={classes.text}
                    >{`Вы действительно хотите удалить ${MYORG.orgname}?`}</div>
                    {loader ? <Loader /> : <Buttons deleteOrg={del} />}
                </div>
            )}
        </>
    );
}
