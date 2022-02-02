// HOC-компонент для развёртывания полей ввода
import React from "react";
import MyInput from "../../utils/input/MyInput.jsx";

export default function OrgInputs({ fields, getValue }) {
    return (
        <>
            {fields.map((fields) => {
                return (
                    <MyInput
                        key={fields.field}
                        field={fields.field}
                        name={fields.name}
                        type={fields.type}
                        getValue={getValue}
                    />
                );
            })}
        </>
    );
}
