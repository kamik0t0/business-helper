import React from "react";
import { Routes, Route } from "react-router-dom";
import CalcForm from "./pages/side-bar/Tax-calc/Tax-calc-form.jsx";
import Inner from "../../front/src/compontents/Inner.jsx";
import Bank from "./pages/side-bar/bank/Bank.jsx";
import Sales from "./pages/side-bar/sales/Sales.jsx";
import Purchases from "./pages/side-bar/purchases/Purchases.jsx";
import Employees from "./pages/side-bar/employees/Employees.jsx";
import Salary from "./pages/side-bar/salary/Salary.jsx";
import NewPurchase from "./pages/side-bar/purchases/New-purchase.jsx";
import NewSale from "./pages/side-bar/sales/New-sale.jsx";
import Login from "../src/pages/header-menu/authorization/Authorization.jsx";
import Forgot from "../src/pages/header-menu/authorization/Forgot.jsx";
import Registration from "../src/pages/header-menu/authorization/Registration.jsx";
import Private from "../src/compontents/private-office/private-office.jsx";
import OrgList from "../src/compontents/private-office/Org-list.jsx";

export default function AppRouter() {
    return (
        <Routes>
            <Route exact path="/" element={<Inner />}></Route>
            <Route exact path="/calculator" element={<CalcForm />}></Route>
            <Route exact path="/bank" element={<Bank />}></Route>
            <Route exact path="/sales" element={<Sales />}></Route>
            <Route exact path="/purchases" element={<Purchases />}></Route>
            <Route exact path="/employees" element={<Employees />}></Route>
            <Route exact path="/salary" element={<Salary />}></Route>
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
            <Route exact path="/private/list" element={<OrgList />}></Route>
        </Routes>
    );
}
