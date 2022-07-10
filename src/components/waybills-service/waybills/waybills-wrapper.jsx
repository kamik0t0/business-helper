import React from "react";
import Invoice from "./waybill/Waybill.jsx";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";

const InvoicesWrapper = ({ invoices, action }) => {
    return (
        <>
            {invoices.length > 0 &&
                invoices.map((invoice, index) => {
                    return (
                        <Invoice
                            key={uuid()}
                            index={index}
                            invoice={invoice}
                            invoices={invoices}
                            action={action}
                        />
                    );
                })}
        </>
    );
};

InvoicesWrapper.propTypes = {
    invoices: PropTypes.array,
    action: PropTypes.func.isRequired,
};

export default InvoicesWrapper;
