import React from "react";
import { Routes, Route } from "react-router-dom";
import CalcForm from "../pages/Tax-calc/Tax-calc-form.jsx";
import Inner from "../pages/info/info.jsx";

import Sales from "../pages/sales/Sales.jsx";
import Purchases from "../pages/purchases/Purchases.jsx";

import NewPurchase from "../pages/purchases/New-purchase.jsx";
import NewSale from "../pages/sales/New-sale.jsx";
import Login from "../pages/authorization/Authorization.jsx";
import Forgot from "../pages/authorization/Forgot.jsx";
import Registration from "../pages/authorization/Registration.jsx";
import Private from "../pages/private-office/private-office.jsx";
import Counterparties from "../pages/counterparties/counterparties.jsx";

export default function AppRouter() {
    return (
        <Routes>
            <Route exact path="/" element={<Inner />}></Route>
            <Route exact path="/calculator" element={<CalcForm />}></Route>
            <Route exact path="/sales" element={<Sales />}></Route>
            <Route exact path="/purchases" element={<Purchases />}></Route>
            <Route
                exact
                path="/purchases/createwaybill"
                element={<NewPurchase />}
            ></Route>
            <Route
                exact
                path="/sales/createwaybill"
                element={<NewSale />}
            ></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/login/forgot" element={<Forgot />}></Route>
            <Route
                exact
                path="/login/registration"
                element={<Registration />}
            ></Route>
            <Route exact path="/private" element={<Private />}></Route>
            <Route
                exact
                path="/counterparties"
                element={<Counterparties />}
            ></Route>
        </Routes>
    );
}