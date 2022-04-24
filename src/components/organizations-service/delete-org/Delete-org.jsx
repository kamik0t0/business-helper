import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./styles/delete-org.module.css";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";
import { hideAnimatedModal } from "../../../UI/modal/service/handlers/modal-control.js";
import { deleteOrg } from "./service/delete.js";
import PropTypes from "prop-types";

export default function DeleteOrg({ setModal }) {
    // анимация
    const [loader, setLoader] = useState(false);
    const MYORG = useSelector((state) => state.setMyOrgReducer.myOrg);
    const dispatch = useDispatch();
    return (
        <>
            {Object.keys(MYORG).length === 0 ? (
                <div className={classes.noorg}>
                    <div className={classes.noorg__text}>
                        Организация не выбрана
                    </div>
                    <MyButton onClick={() => hideAnimatedModal(setModal)}>
                        Закрыть
                    </MyButton>
                </div>
            ) : (
                <div className={classes.delete}>
                    <div
                        className={classes.text}
                    >{`Вы действительно хотите удалить ${MYORG.orgname}?`}</div>
                    {loader ? (
                        <Loader />
                    ) : (
                        <div className={classes.buttons}>
                            <MyButton
                                onClick={() => {
                                    dispatch(
                                        deleteOrg(() => setLoader(!loader))
                                    );
                                    hideAnimatedModal(setModal);
                                }}
                            >
                                Yes
                            </MyButton>
                            <MyButton
                                onClick={() => hideAnimatedModal(setModal)}
                            >
                                No
                            </MyButton>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

DeleteOrg.propTypes = {
    setModal: PropTypes.func.isRequired,
};
