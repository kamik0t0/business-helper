import PropTypes from "prop-types";
import Button from "../../../../../UI/input/Button/Button";
import TextField from "../../../../../UI/input/TextField/TextField";
import RequisiteFieldName from "../../../common/components/PatchRequisiteFieldName/PatchRequisiteFieldName";
import { usePatchField } from "../../service/hooks/usePatchField";
import classes from "./styles/patch-fields.module.css";
import { useRef } from "react";

const inlineButtonStyle = {
    width: "50px",
};

export default function PatchRequisiteField({ requisite }) {
    const [
        focus,
        updateProp,
        Cancel,
        error,
        inputValidation,
        getValue,
        saveOldValues,
        switchField,
    ] = usePatchField(requisite);

    const RedactableDiv = useRef();

    return (
        <div
            ref={RedactableDiv}
            onClick={switchField}
            className={classes.content}
        >
            <RequisiteFieldName fieldName={requisite.inputFieldName} />
            {focus ? (
                <div className={classes.fields__item}>
                    <div className={classes.redactable}>
                        <TextField
                            type="text"
                            length={requisite.inputValueLength}
                            isNumber={requisite.isNumber}
                            defaultValue={requisite.value}
                            error={error}
                            onInput={inputValidation}
                            onChange={getValue}
                            onFocus={saveOldValues}
                            focus={focus}
                        />
                        <div className={classes.buttons}>
                            <Button
                                onClick={updateProp}
                                style={inlineButtonStyle}
                            >
                                Ок
                            </Button>
                            <Button onClick={Cancel}>Отмена</Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={classes.requisit_value}>{requisite.value}</div>
            )}
        </div>
    );
}

PatchRequisiteField.propTypes = {
    requisite: PropTypes.object.isRequired,
    fieldIndex: PropTypes.number.isRequired,
};
