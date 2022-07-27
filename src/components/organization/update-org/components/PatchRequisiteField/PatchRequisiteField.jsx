import classes from "./styles/patch-fields.module.css";
import MyButton from "../../../../../UI/input/MyButton/MyButton";
import RequisiteInput from "../../../../../UI/input/RequisiteInput/RequisiteInput";
import PropTypes from "prop-types";
import { usePatchField } from "../../service/hooks/usePatchField";
import RequisiteFieldName from "../../../common/components/PatchRequisiteFieldName/PatchRequisiteFieldName";

const inlineButtonStyle = {
    width: "50px",
};

export default function PatchRequisiteField({ requisite, fieldIndex }) {
    const [focus, prevValue, inputRef, Ok, Cancel, inputError, isInputError] =
        usePatchField(requisite, fieldIndex);

    const defaultInputValue = prevValue.current?.innerHTML;

    const actualRequisiteValue = inputRef.current?.value
        ? inputRef.current.value
        : requisite.value;

    return (
        <div id={fieldIndex} className={classes.content}>
            <RequisiteFieldName fieldName={requisite.inputFieldName} />
            {focus ? (
                <div className={classes.fields__item}>
                    <div className={classes.redactable}>
                        <RequisiteInput
                            ref={inputRef}
                            length={requisite.inputValueLength}
                            isNumber={requisite.isNumber}
                            defaultValue={defaultInputValue}
                            error={inputError}
                            isInputError={isInputError}
                        />
                        <div className={classes.buttons}>
                            <MyButton onClick={Ok} style={inlineButtonStyle}>
                                Ок
                            </MyButton>
                            <MyButton onClick={Cancel}>Отмена</MyButton>
                        </div>
                    </div>
                </div>
            ) : (
                <div ref={prevValue} className={classes.requisit_value}>
                    {actualRequisiteValue}
                </div>
            )}
        </div>
    );
}

PatchRequisiteField.propTypes = {
    requisite: PropTypes.object.isRequired,
    fieldIndex: PropTypes.number.isRequired,
};
