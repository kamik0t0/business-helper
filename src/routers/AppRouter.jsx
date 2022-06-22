import React from "react";
import { Routes, Route } from "react-router-dom";
import CalcForm from "../pages/Tax-calc/Tax-calc-form.jsx";
import Tabs from "../pages/info/info.jsx";
import Sales from "../pages/sales/Sales.jsx";
import Purchases from "../pages/purchases/Purchases.jsx";
import NewPurchase from "../pages/purchases/New-purchase.jsx";
import NewSale from "../pages/sales/New-sale.jsx";
import Login from "../pages/authorization/Authorization.jsx";
import Forgot from "../pages/authorization/Forgot.jsx";
import Registration from "../pages/authorization/Registration.jsx";
import Private from "../pages/private-office/private-office.jsx";
import Counterparties from "../pages/counterparties/counterparties.jsx";
import UpdateSale from "../pages/sales/Update-sale.jsx";
import UpdatePurchase from "../pages/purchases/Update-purchase.jsx";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Tabs />}></Route>
            <Route path="/calculator" element={<CalcForm />}></Route>
            <Route path="/sales" element={<Sales />}></Route>
            <Route path="/sales/:id" element={<UpdateSale />}></Route>
            <Route path="/purchases" element={<Purchases />}></Route>
            <Route path="/purchases/:id" element={<UpdatePurchase />}></Route>
            <Route path="/sales/createwaybill" element={<NewSale />}></Route>
            <Route
                path="/purchases/createwaybill"
                element={<NewPurchase />}
            ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/login/forgot" element={<Forgot />}></Route>
            <Route
                path="/login/registration"
                element={<Registration />}
            ></Route>
            <Route path="/private" element={<Private />}></Route>
            <Route path="/counterparties" element={<Counterparties />}></Route>
            <Route
                path="/purchases/updatewaybill/counterparties"
                element={<Counterparties />}
            ></Route>
            <Route path="/counterparties" element={<Counterparties />}></Route>
            <Route
                path="/sales/updatewaybill/counterparties"
                element={<Counterparties />}
            ></Route>
            <Route path="/counterparties" element={<Counterparties />}></Route>
        </Routes>
    );
}
