import React, { useState } from "react";
import classes from "./delete-org.module.css";
import MyButton from "../../utils/input/MyButton.jsx";
import { getMyOrgsFromDB } from "../../utils/getOrgs.js";
import { clear } from "../../utils/clear.js";
import Loader from "../../UI/Loader/Loader.jsx";
import { useDispatch } from "react-redux";

export default function DeleteOrg({ setActive, org, setOrg }) {
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    async function deleteOrg(url) {
        setLoader(true);
        try {
            let response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let result = await response.json();
            if (result.deleted) {
                console.log(result.message);
                localStorage.removeItem("currentOrg");
                await getMyOrgsFromDB(
                    `https://deploy-test-business-assist.herokuapp.com/private/?UserId=${localStorage.getItem(
                        "UserId"
                    )}`
                    // `http://localhost:5600/private/?UserId=${localStorage.getItem(
                    //     "UserId"
                    // )}`
                );
            } else {
                console.log(result.message);
            }
            // После удаление организации значение в select ставится на дефолтное
            clear();
            // перендер компонента (убирается currentOrg и информация об организации удаляется из личного кабинета)
            setOrg(localStorage.removeItem("currentOrg"));
            // модальное окно скрывается
            setActive(false);
            setLoader(false);
        } catch (error) {
            setLoader(false);
            dispatch({ type: "isERROR_TRUE", payload: true });
            dispatch({ type: "REG_FALSE", payload: false });
            setActive(false);
            console.log("No connection to server");
        }
    }
    return (
        <>
            {" "}
            {org === undefined ||
            org === null ||
            org === "undefined" ||
            org === "null" ||
            !org ? (
                <div className={classes.delete}>
                    <div className={classes.noorg}>Организация не выбрана</div>
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
                                        `https://deploy-test-business-assist.herokuapp.com/private/?orgname=${org.orgname}`
                                        // `http://localhost:5600/private/?orgname=${org.orgname}`
                                    )
                                }
                            >
                                Yes
                            </MyButton>
                            <MyButton onClick={() => setActive(false)}>
                                No
                            </MyButton>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
