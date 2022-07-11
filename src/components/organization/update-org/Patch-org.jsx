import classes from "./styles/patch-org.module.css";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";
import { usePatchOrg } from "./service/hooks/usePatchOrg.js";
import PatchFields from "../common/components/PatchFieldsWrapper";
import React from "react";
import PropTypes from "prop-types";

export const PatchContext = React.createContext();

export default function PatchOrg({ ORG, action }) {
    const PatchAPI = usePatchOrg(ORG, action);
    const PatchFuncs = {
        getInputLengthLimit: PatchAPI.getInputLengthLimit,
        getUpdateValue: PatchAPI.getUpdateValue,
    };

    return (
        <>
            {ORG === null ? (
                <div className={classes.read}>
                    <div className={classes.noorg}>Организация не выбрана</div>
                </div>
            ) : (
                <div className={classes.read}>
                    <div className={classes.header}>Реквизиты</div>
                    {PatchAPI.loader ? (
                        <Loader />
                    ) : (
                        <PatchContext.Provider value={PatchFuncs}>
                            <PatchFields OrgData={PatchAPI.OrgData} />
                        </PatchContext.Provider>
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

PatchOrg.propTypes = {
    ORG: PropTypes.object,
    action: PropTypes.func,
};
