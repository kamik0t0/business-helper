import React, { useRef, useState } from "react";
import classes from "./patch-org.module.css";
import MyButton from "../../utils/input/MyButton";
import { orgFields } from "../../utils/Org.js";
import { IpFields } from "../../utils/Org.js";
import { Organizaton } from "../../utils/Org.js";
import PatchControl from "./Patch-control.jsx";
import { getMyOrgsFromDB } from "../../utils/getOrgs.js";
import { chooseOrg } from "../../utils/getOrgs.js";
import Loader from "../../UI/Loader/Loader.jsx";
import { useDispatch } from "react-redux";

export default function PatchOrg({ setActive, org, isORG, setOrg }) {
    // объект с обновленными значениями
    const Updated = useRef(new Organizaton());
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    let currentOrg;

    // определяется перечень полей для ренеринга - ООО или ИП
    try {
        currentOrg = isORG
            ? addReqValue(orgFields, org)
            : addReqValue(IpFields, org);
    } catch (error) {
        console.log("Организация не выбрана");
    }

    // объект с полями получает значения реквизитов
    function addReqValue(orgType, reqs) {
        for (const obj of orgType) {
            obj.value = reqs[obj.field];
        }
        // возвращает объект который становится currentOrg
        return orgType;
    }

    function setValue(event, field, newValue) {
        Updated.current[field] = newValue.trim();
    }

    async function update(event) {
        event.preventDefault();
        setLoader(true);
        try {
            // + email для идентификации пользователя
            Updated.current["email"] = localStorage.getItem("email");
            // + ИНН для идентификации обновляемой организации
            Updated.current["upINN"] = JSON.parse(
                localStorage.getItem("currentOrg")
            ).inn;
        } catch (error) {
            console.log("Session expired... Authorize again");
        }

        // оставляем обновленные свойства
        for (const prop in Updated.current) {
            if (Updated.current[prop] === undefined)
                delete Updated.current[prop];
        }
        try {
            let response = await fetch(
                "https://deploy-test-business-assist.herokuapp.com/private",
                // "http://localhost:5600/private",
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(Updated.current),
                }
            );

            let result = await response.json();
            console.log(result);

            if (result.updated) {
                // заружаем список организаций из БД
                await getMyOrgsFromDB(
                    `https://deploy-test-business-assist.herokuapp.com/private/?UserId=${localStorage.getItem(
                        "UserId"
                    )}`
                    // `http://localhost:5600/private/?UserId=${localStorage.getItem(
                    //     "UserId"
                    // )}`
                );
                chooseOrg(org.id);
                setOrg(JSON.parse(localStorage.getItem("currentOrg")));
                setLoader(false);
                setActive(false);
            }
        } catch (error) {
            setLoader(false);
            dispatch({ type: "isERROR_TRUE", payload: true });
            dispatch({ type: "REG_FALSE", payload: false });
            setActive(false);
            console.log("no connection to server");
        }
    }

    return (
        <>
            {/* если параметр организации не определен, то компонент не рендерится */}
            {org === undefined ||
            org === null ||
            org === "undefined" ||
            org === "null" ||
            !org ? (
                <div className={classes.read}>
                    <div className={classes.noorg}>Организация не выбрана</div>
                </div>
            ) : (
                <div className={classes.read}>
                    <div className={classes.header}>Реквизиты</div>
                    {loader ? (
                        <Loader />
                    ) : (
                        currentOrg.map((obj, number) => {
                            return (
                                <PatchControl
                                    key={obj.field}
                                    number={number}
                                    obj={obj}
                                    getValue={(event) => event.target.value}
                                    setValue={setValue}
                                />
                            );
                        })
                    )}

                    <div className={classes.buttons}>
                        {" "}
                        <MyButton onClick={update}>Обновить</MyButton>
                        <MyButton onClick={() => setActive(false)}>
                            Закрыть
                        </MyButton>
                    </div>
                </div>
            )}
        </>
    );
}
