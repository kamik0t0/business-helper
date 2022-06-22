import classes from "./styles/patch-org.module.css";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";
import { useSelector } from "react-redux";
import { MyOrg } from "../../../redux/setMyOrg-reducer.js";
import { usePatchOrg } from "./service/hooks/usePatchOrg.js";
import { useMyOrg } from "./service/hooks/useMyOrg";
import PatchFieldsWrapper from "../../common/components/PatchFieldsWrapper";
import React from "react";

export const PatchContext = React.createContext();

export default function PatchOrg() {
    const MYORG = useSelector(MyOrg);
    const myOrgRequisites = useMyOrg(MYORG);

    const [loader, hideModal, getInputValue, setInputValue, update] =
        usePatchOrg(MYORG);

    return (
        <>
            {Object.keys(MYORG).length === 0 ? (
                <div className={classes.read}>
                    <div className={classes.noorg}>Организация не выбрана</div>
                </div>
            ) : (
                <div className={classes.read}>
                    <div className={classes.header}>Реквизиты</div>
                    {loader ? (
                        <Loader />
                    ) : (
                        <PatchFieldsWrapper
                            requisites={myOrgRequisites}
                            getInputValue={getInputValue}
                            setInputValue={setInputValue}
                        />
                    )}

                    <div className={classes.buttons}>
                        <MyButton onClick={update}>Обновить</MyButton>
                        <MyButton onClick={hideModal}>Закрыть</MyButton>
                    </div>
                </div>
            )}
        </>
    );
}
