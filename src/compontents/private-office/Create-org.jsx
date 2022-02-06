import React, { useState, useRef, useEffect } from "react";
import classes from "./create-org.module.css";
import OrgInputs from "./Org-field.jsx";
import MySelect from "../../utils/input/MySelect";
import Controls from "./Create-org-controls.jsx";
import { Organizaton } from "../../utils/Org.js";
import { orgFields } from "../../utils/Org.js";
import { Individual } from "../../utils/Org.js";
import { IpFields } from "../../utils/Org.js";
import { getMyOrgsFromDB } from "../../utils/getOrgs.js";
import { clear } from "../../utils/clear.js";
import Loader from "../../UI/Loader/Loader.jsx";
import { useDispatch } from "react-redux";

export default function CreateOrg({ setActive, setOrg }) {
    const ORG = useRef(new Organizaton());
    const IE = useRef(new Individual());

    // задание начальных значений, поскольку пользователь
    ORG.current["opf"] = "Общество с ограниченной ответственностью";
    IE.current["opf"] = "Индивидуальный предприниматель";

    const [opf, setOpf] = useState("ORG");
    const [loader, setLoader] = useState(false);

    const dispatch = useDispatch();
    // запрос на создание новой организации
    async function create(event, orgType) {
        event.preventDefault();

        // проверка ввода
        for (const key in orgType) {
            if (orgType[key] === undefined) return;
            // проверка полей
            if (
                (orgType["inn"] !== undefined &&
                    orgType["inn"].length !== orgType["innLength"]) ||
                (orgType["kpp"] !== undefined &&
                    orgType["kpp"].length !== orgType["kppLength"])
            )
                return;
        }

        // добавление в тело запроса email авторизованного пользователя
        try {
            orgType["email"] = localStorage.getItem("email");
        } catch (error) {
            console.log("Session expired... Authorize again");
        }
        try {
            setLoader(true);
            // отправка запроса
            let response = await fetch(
                // "http://localhost:5600/private",
                "https://deploy-test-business-assist.herokuapp.com/private",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(orgType),
                }
            );
            // получение ответа
            let result = await response.json();
            console.log(result);
            // если в ответе есть поле created
            if (result.created) {
                // убираем email в объекте с реквизитами
                delete orgType.email;
                // заружаем список организаций из БД (только наименования)
                await getMyOrgsFromDB(
                    // `http://localhost:5600/private/?UserId=${localStorage.getItem(
                    //     "UserId"
                    // )}`
                    `https://deploy-test-business-assist.herokuapp.com/private/?UserId=${localStorage.getItem(
                        "UserId"
                    )}`
                );
                // установили текущую организацию
                let [currentOrg] = JSON.parse(
                    localStorage.getItem("orgs")
                ).filter((object) => object.orgname === orgType.orgname);
                localStorage.setItem("currentOrg", JSON.stringify(currentOrg));

                setOrg(JSON.parse(localStorage.getItem("currentOrg")));
                clear(orgType.orgname);
                setLoader(false);
                setActive((prev) => {
                    return { ...prev, add: false };
                });

                // обновляем поля
                ORG.current = new Organizaton();
                IE.current = new Individual();
            } else {
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
                console.log("error");
                // обновляем поля
                ORG.current = new Organizaton();
                IE.current = new Individual();
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
            console.log("No connection to server");
            // обновляем поля
            ORG.current = new Organizaton();
            IE.current = new Individual();
        }
    }
    // выбор организационно-правовой формы - изменяем поля ввода
    function getOPF(event) {
        if (event.target.value === "Общество с ограниченной ответственностью") {
            setOpf("ORG");
        } else {
            setOpf("IE");
        }
    }
    // получаем остальные реквизиты
    function getValue(event, field, length) {
        if (opf === "ORG") {
            if (field in ORG.current)
                ORG.current[field] = event.target.value.trim();
            // получение длины ИНН
            ORG.current["kppLength"] =
                length !== undefined && field === "kpp"
                    ? length
                    : ORG.current["kppLength"];
            // получение длины КПП
            ORG.current["innLength"] =
                length !== undefined && field === "inn"
                    ? length
                    : ORG.current["innLength"];
        } else {
            if (field in IE.current)
                IE.current[field] = event.target.value.trim();
            // получение длины ИНН
            IE.current["innLength"] =
                length !== undefined && field === "inn"
                    ? length
                    : IE.current["innLength"];
        }
    }

    return (
        <>
            <div className={classes.create}>
                <div className={classes.name}>Введите реквизиты</div>
                <MySelect
                    name="Выберите ОПФ"
                    style={{ color: "#F0EBDD" }}
                    options={[
                        "Выберите организационно-правовую форму из списка",
                        "Общество с ограниченной ответственностью",
                        "Индивидуальный предприниматель",
                    ]}
                    func={getOPF}
                />{" "}
                {opf === "ORG" ? (
                    <>
                        {" "}
                        {loader ? (
                            <Loader />
                        ) : (
                            <OrgInputs fields={orgFields} getValue={getValue} />
                        )}
                        <Controls
                            create={(event) => create(event, ORG.current)}
                            clear={clear}
                            setActive={setActive}
                        />
                    </>
                ) : (
                    <>
                        {loader ? (
                            <Loader />
                        ) : (
                            <OrgInputs fields={IpFields} getValue={getValue} />
                        )}

                        <Controls
                            create={(event) => create(event, IE.current)}
                            clear={clear}
                            setActive={setActive}
                        />
                    </>
                )}
            </div>
        </>
    );
}
