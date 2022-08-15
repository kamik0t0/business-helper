import React from "react";
import { ICounterparty } from "../../../interfaces/counterparty";
import Button from "../../../UI/input/Button/Button";
import Loader from "../../../UI/Loader/Loader";
import PatchFields from "../common/components/PatchRequisiteFieldsWrapper";
import { usePatchOrg } from "./service/hooks/usePatchOrg";
import { usePatchRequisites } from "./service/hooks/usePatchRequisites";
import classes from "./styles/patch-org.module.css";
import { CustomContext } from "../../../hooks/customContext";

type PatchContextTypes = (
    value: string | number | boolean | null | undefined,
    inputField: string
) => void;

export const PatchProvider = CustomContext<PatchContextTypes>();

type PatchOrgTypes = {
    //TODO: организация и контрагент должны имплементировать один интерфейс.
    org: any;
    action: any;
    isLoading: boolean;
};

const PatchOrg: React.FC<PatchOrgTypes> = ({
    org = null,
    action,
    isLoading,
}) => {
    const PatchRequisitesAPI = usePatchRequisites(org);
    const PatchAPI = usePatchOrg(org, PatchRequisitesAPI.newOrgReqs, action);
    const PatchFieldArr = Array.isArray(PatchRequisitesAPI.PatchFields)
        ? PatchRequisitesAPI.PatchFields
        : [];

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
                        <PatchProvider.Provider
                            value={PatchRequisitesAPI.getInputValue}
                        >
                            <PatchFields PatchFields={PatchFieldArr} />
                        </PatchProvider.Provider>
                    )}

                    <div className={classes.buttons}>
                        <Button onClick={PatchAPI.update}>Обновить</Button>
                        <Button onClick={PatchAPI.hideModal}>Закрыть</Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default PatchOrg;
