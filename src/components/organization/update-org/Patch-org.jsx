import PropTypes from "prop-types";
import React from "react";
import Button from "../../../UI/input/Button/Button.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";
import PatchFields from "../common/components/PatchRequisiteFieldsWrapper";
import { usePatchOrg } from "./service/hooks/usePatchOrg";
import { usePatchRequisites } from "./service/hooks/usePatchRequisites";
import classes from "./styles/patch-org.module.css";

export const PatchContext = React.createContext();

export default function PatchOrg({ org = null, action, isLoading }) {
    const PatchRequisitesAPI = usePatchRequisites(org);
    const PatchAPI = usePatchOrg(org, action, PatchRequisitesAPI.UpdateData);
    const PatchFuncs = {
        getInputLengthLimit: PatchRequisitesAPI.getInputLengthLimit,
        getUpdateValue: PatchRequisitesAPI.getUpdateValue,
    };

    return (
        <>
            {org === null ? (
                <div className={classes.read}>
                    <div className={classes.noorg}>Организация не выбрана</div>
                </div>
            ) : (
                <div className={classes.read}>
                    <div className={classes.header}>Реквизиты</div>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <PatchContext.Provider value={PatchFuncs}>
                            <PatchFields
                                PatchFields={PatchRequisitesAPI.PatchFields}
                            />
                        </PatchContext.Provider>
                    )}

                    <div className={classes.buttons}>
                        <Button onClick={PatchAPI.update}>Обновить</Button>
                        <Button onClick={PatchAPI.hideModal}>Закрыть</Button>
                    </div>
                </div>
            )}
        </>
    );
}

PatchOrg.propTypes = {
    org: PropTypes.object,
    action: PropTypes.func,
    isLoading: PropTypes.bool,
};
