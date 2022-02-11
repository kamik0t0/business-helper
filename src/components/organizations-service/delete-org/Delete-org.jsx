import React, { useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./styles/delete-org.module.css";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";

import { hideAnimatedModal } from "../../../UI/modal/service/handlers/modal-control.js";
import { deleteOrg } from "./service/handlers/delete.js";

export default function DeleteOrg({
    setModal,
    setActiveOrg,
    myOrg,
    url,
    type,
    noselected,
}) {
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();

    return (
        <>
            {myOrg === undefined || myOrg === null ? (
                <div className={classes.delete}>
                    <div className={classes.noorg}>{noselected}</div>
                </div>
            ) : (
                <div className={classes.delete}>
                    <div
                        className={classes.text}
                    >{`Вы действительно хотите удалить ${myOrg.orgname}?`}</div>
                    {loader ? (
                        <Loader />
                    ) : (
                        <div className={classes.buttons}>
                            <MyButton
                                onClick={() =>
                                    deleteOrg(
                                        setModal,
                                        setActiveOrg,
                                        myOrg,
                                        type,
                                        url,
                                        setLoader,
                                        dispatch
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
