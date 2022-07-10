import classes from "./styles/patch-org.module.css";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";
import { usePatchOrg } from "./service/hooks/usePatchOrg.js";
import PatchFieldsWrapper from "../../common/components/PatchFieldsWrapper";
import React from "react";

export const PatchContext = React.createContext();

export default function PatchOrg() {
    const PatchAPI = usePatchOrg();

    return (
        <>
            {PatchAPI.USERORG === null ? (
                <div className={classes.read}>
                    <div className={classes.noorg}>Организация не выбрана</div>
                </div>
            ) : (
                <div className={classes.read}>
                    <div className={classes.header}>Реквизиты</div>
                    {PatchAPI.loader ? (
                        <Loader />
                    ) : (
                        <PatchFieldsWrapper
                            requisites={PatchAPI.Requisites}
                            getInputValue={PatchAPI.getInputValue}
                            setInputValue={PatchAPI.setInputValue}
                        />
                    )}

                    <div className={classes.buttons}>
                        <MyButton onClick={PatchAPI.update}>Обновить</MyButton>
                        <MyButton onClick={PatchAPI.hideModal}>
                            Закрыть
                        </MyButton>
                    </div>
                </div>
            )}
        </>
    );
}
