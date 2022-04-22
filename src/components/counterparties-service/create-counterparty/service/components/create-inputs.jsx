// HOC-компонент для развёртывания полей ввода
import React from "react";
import MyInput from "../../../../../UI/input/MyInput/MyInput.jsx";
import { filterRequisites } from "../../../handlers/filter-requisites.js";
import PropTypes from "prop-types";

export default function Inputs({ fields, getValue, isORG }) {
    // фильтрация полей если создается ИП
    const filtered = filterRequisites(fields, isORG);
    return (
        <>
            {filtered.map((fields) => {
                return (
                    <MyInput
                        key={fields.field}
                        field={fields.field}
                        name={fields.name}
                        type={fields.type}
                        length={fields.lngth}
                        isNumber={fields.num}
                        getValue={getValue}
                    />
                );
            })}
        </>
    );
}

Inputs.propTypes = {
    fields: PropTypes.array.isRequired,
    getValue: PropTypes.func.isRequired,
    isORG: PropTypes.bool.isRequired,
};
