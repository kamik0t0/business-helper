import React, { useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./styles/delete-org.module.css";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";

import { hideAnimatedModal } from "../../../UI/modal/service/handlers/modal-control.js";
import { deleteOrg } from "./service/delete.js";
import PropTypes from "prop-types";

export default function DeleteOrg({
    setModal,
    setOrgs,
    org,
    url,
    type,
    noselected,
    idName,
}) {
    // анимация
    const [loader, setLoader] = useState(false);
    // redux
    const dispatch = useDispatch();
    return (
        <>
            {org === undefined || org === null ? (
                <div className={classes.noorg}>
                    <div className={classes.noorg__text}>{noselected}</div>
                    <MyButton onClick={() => hideAnimatedModal(setModal)}>
                        Закрыть
                    </MyButton>
                </div>
            ) : (
                <div className={classes.delete}>
                    <div
                        className={classes.text}
                    >{`Вы действительно хотите удалить ${org.orgname}?`}</div>
                    {loader ? (
                        <Loader />
                    ) : (
                        <div className={classes.buttons}>
                            <MyButton
                                onClick={() =>
                                    deleteOrg(
                                        setModal,
                                        setOrgs,
                                        org,
                                        type,
                                        url,
                                        setLoader,
                                        dispatch,
                                        idName
                                    )
                                }
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
    setOrgs: PropTypes.func,
    org: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    noselected: PropTypes.string.isRequired,
    idName: PropTypes.string.isRequired,
};
