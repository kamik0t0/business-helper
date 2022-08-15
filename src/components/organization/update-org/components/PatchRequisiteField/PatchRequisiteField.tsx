import Button from "../../../../../UI/input/Button/Button";
import TextField from "../../../../../UI/input/TextField/TextField";
import RequisiteFieldName from "../../../common/components/PatchRequisiteFieldName/PatchRequisiteFieldName";
import { usePatchField } from "../../service/hooks/usePatchField";
import classes from "./styles/patch-fields.module.css";
import { useRef, FC } from "react";
import { IRequisiteView } from "../../../../../interfaces/requisite";

const inlineButtonStyle = {
    width: "50px",
};

const PatchRequisiteField: FC<{ requisite: IRequisiteView }> = ({
    requisite,
}) => {
    const [
        focus,
        error,
        updateProp,
        cancel,
        switchDivToText,
        inputValidation,
        getValue,
        saveOldValues,
    ] = usePatchField(requisite);

    const RedactableDiv = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={RedactableDiv}
            onClick={switchDivToText}
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
                            <Button onClick={cancel}>Отмена</Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={classes.requisit_value}>{requisite.value}</div>
            )}
        </div>
    );
};

export default PatchRequisiteField;
