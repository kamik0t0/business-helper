import { memo } from "react";
import classes from "./styles/PatchRequisiteField.module.css";

const RequisiteFieldName: React.FC<{ fieldName: string }> = memo(
    ({ fieldName }) => {
        return <div className={classes.requisit_name}>{fieldName}</div>;
    }
);

export default RequisiteFieldName;
