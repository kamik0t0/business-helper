import React, { useRef, useState } from "react";
import classes from "./patch-org.module.css";
import MyButton from "../../utils/input/MyButton";
import { orgFields } from "../../utils/Org.js";
import { IpFields } from "../../utils/Org.js";
import { Organizaton } from "../../utils/Org.js";
import PatchFields from "./Patch-fields.jsx";
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

    // определяется перечень полей для рендеринга - ООО или ИП
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
        if (!Updated.current["lngth"]) {
            Updated.current[field] = newValue.trim();
            return true;
        }
        if (newValue.length !== Updated.current["lngth"]) return false;
        Updated.current[field] = newValue.trim();
        return true;
    }

    function getValue(event, field, length) {
        // получаем значение длины и создаем соответствующее поле для последующей проверки
        delete Updated.current[`lngth`];
        if (
            length === undefined ||
            length === "undefined" ||
            length === null ||
            length === "null" ||
            !length
        )
            return;
        Updated.current[`lngth`] = length !== undefined && length;
    }

    async function update(event) {
        event.preventDefault();
        // оставляем обновленные свойства
        for (const prop in Updated.current) {
            if (Updated.current[prop] === undefined)
                delete Updated.current[prop];
        }
        // если не обновили ни одного поля
        if (Object.keys(Updated.current).length === 0) return;
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
                {
                    setActive((prev) => {
                        return { ...prev, add: false };
                    });
                    setTimeout(() => {
                        setActive((prev) => {
                            return { ...prev, show: false };
                        });
                    }, 500);
                }
            }
        } catch (error) {
            setLoader(false);
            dispatch({
                type: "isERROR_TRUE",
                payload: true,
                message: "No connection to server",
            });
            dispatch({ type: "REG_FALSE", payload: false });
            {
                setActive((prev) => {
                    return { ...prev, add: false };
                });
                setTimeout(() => {
                    setActive((prev) => {
                        return { ...prev, show: false };
                    });
                }, 500);
            }
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
                                <PatchFields
                                    key={obj.field}
                                    number={number}
                                    obj={obj}
                                    length={obj.lngth}
                                    isNumber={obj.num}
                                    getValue={getValue}
                                    setValue={setValue}
                                />
                            );
                        })
                    )}

                    <div className={classes.buttons}>
                        {" "}
                        <MyButton onClick={update}>Обновить</MyButton>
                        <MyButton
                            onClick={() => {
                                setActive((prev) => {
                                    return { ...prev, add: false };
                                });
                                setTimeout(() => {
                                    setActive((prev) => {
                                        return { ...prev, show: false };
                                    });
                                }, 500);
                            }}
                        >
                            Закрыть
                        </MyButton>
                    </div>
                </div>
            )}
        </>
    );
}
