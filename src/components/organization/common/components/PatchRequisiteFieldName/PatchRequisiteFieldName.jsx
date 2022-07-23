import { memo } from "react";
import classes from "./styles/PatchRequisiteField.module.css";
import PropTypes from "prop-types";

const RequisiteFieldName = memo(({ fieldName }) => {
    return <div className={classes.requisit_name}>{fieldName}</div>;
});

RequisiteFieldName.propTypes = {
    inputFieldName: PropTypes.string.isRequired,
};

export default RequisiteFieldName;
