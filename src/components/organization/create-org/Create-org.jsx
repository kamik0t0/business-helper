import classes from "./styles/create-org.module.css";
import Inputs from "./service/components/create-inputs.jsx";
import MySelect from "../../../UI/input/MySelect/MySelect.jsx";
import Buttons from "./service/components/create-buttons.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";
import { useCreateOrg } from "./service/hooks/useCreateOrg.js";
import { useRequisites } from "../common/hooks/useRequisites";
import { Organizaton } from "../../../utils/Org";
import { useRef } from "react";
import PropTypes from "prop-types";

const OPFoptions = [
    "Выберите организационно-правовую форму",
    "Общество с ограниченной ответственностью",
    "Индивидуальный предприниматель",
];

export default function CreateOrg({ UserId, OrgId = null, action }) {
    const ORG = useRef(new Organizaton());

    ORG.current.UserId = UserId;
    ORG.current.OrgId = OrgId && OrgId;

    const [fields, getOPF, getInputsValues] = useRequisites(ORG);
    const [loader, create] = useCreateOrg(action);

    const createOrg = (event) => create(event, ORG.current);
    return (
        <>
            <div className={classes.create}>
                <div className={classes.name}>Введите реквизиты</div>
                <MySelect
                    name="Выберите ОПФ"
                    style={{ color: "#F0EBDD" }}
                    defaultValue={["Выберите организационно-правовую форму"][0]}
                    options={OPFoptions}
                    func={getOPF}
                />
                {loader ? (
                    <Loader />
                ) : (
                    <Inputs fields={fields} getValue={getInputsValues} />
                )}
                <Buttons create={createOrg} />
            </div>
        </>
    );
}

CreateOrg.propTypes = {
    UserId: PropTypes.number.isRequired,
    OrgId: PropTypes.number,
    action: PropTypes.func,
};
