import TextField from "../../../../../../UI/input/TextField/TextField";
import RequisiteFieldName from "../../../../common/components/PatchRequisiteFieldName/PatchRequisiteFieldName";
import classes from "./styles/create-fields.module.css";
import { useInputField } from "../../hooks/useInputField";
import { IRequisiteView } from "../../../../../../interfaces/requisite";
import { FC } from "react";

const RequisiteInputField: FC<{
    requisite: IRequisiteView;
    fieldIndex: number;
}> = ({ requisite, fieldIndex }) => {
    const [getIndex, getValue, error, inputValidation] = useInputField(
        requisite,
        fieldIndex
    );

    return (
        <div className={classes.content}>
            <RequisiteFieldName fieldName={requisite.inputFieldName} />
            <div className={classes.fields__item}>
                <div className={classes.redactable}>
                    <TextField
                        type="text"
                        length={requisite?.inputValueLength}
                        isNumber={requisite.isNumber}
                        defaultValue={requisite.value}
                        error={error}
                        onInput={inputValidation}
                        onChange={getValue}
                        onFocus={getIndex}
                        focus={requisite.focus}
                    />
                </div>
            </div>
        </div>
    );
};

export default RequisiteInputField;
