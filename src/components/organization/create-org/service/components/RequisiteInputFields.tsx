import { uuid } from "uuidv4";
import { IRequisiteView } from "../../../../../interfaces/requisite";
import RequisiteInputField from "./CreateRequisiteField/RequisiteInputField";

type RequisiteInputFieldsTypes = {
    RequisiteInputFields: IRequisiteView[];
};

const RequisiteInputFields: React.FC<RequisiteInputFieldsTypes> = ({
    RequisiteInputFields,
}) => {
    return (
        <>
            {RequisiteInputFields.map((requisiteInput, index) => {
                return (
                    <RequisiteInputField
                        key={uuid()}
                        requisite={requisiteInput}
                        fieldIndex={index}
                    />
                );
            })}
        </>
    );
};

export default RequisiteInputFields;
