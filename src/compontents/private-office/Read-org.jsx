import React from "react";
import classes from "./read-org.module.css";
import { orgFields } from "../../utils/Org.js";
import { IpFields } from "../../utils/Org.js";
import MyButton from "../../utils/input/MyButton.jsx";

export default function ReadOrg({ setActive, org, isORG }) {
    let currentOrg;
    try {
        currentOrg = isORG
            ? addReqValue(orgFields, org)
            : addReqValue(IpFields, org);
    } catch (error) {
        console.log("Организация не выбрана");
    }
    // функция запускается только в случае если параметр org - организация
    function addReqValue(orgType, reqs) {
        for (const obj of orgType) {
            obj.value = reqs[obj.field];
        }

        return orgType;
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

                    {currentOrg.map((obj) => {
                        return (
                            <div key={obj.field} className={classes.content}>
                                <div className={classes.requisit_name}>
                                    {obj.name}
                                </div>
                                <div className={classes.requisit_value}>
                                    {obj.value}
                                </div>
                            </div>
                        );
                    })}
                    <div className={classes.buttons}>
                        {" "}
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
                            EXCEL
                        </MyButton>
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
