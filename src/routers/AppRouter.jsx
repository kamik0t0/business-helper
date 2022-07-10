import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import { useTypedSelector } from "../redux/hooks/hooks";

export default function AppRouter() {
    const isAuth = useTypedSelector((state) => state.authReducer.isAuth);
    const location = useLocation();
    return (
        <>
            {isAuth ? (
                <Routes>
                    <Route path="/" element={<Tabs />}></Route>
                    <Route path="/calculator" element={<CalcForm />}></Route>
                    <Route path="/private" element={<Private />}></Route>
                    <Route
                        path="/counterparties/:orgId"
                        element={<Counterparties />}
                    ></Route>
                    <Route path="/sales/:orgId" element={<Sales />}></Route>
                    <Route
                        path="/purchases/:orgId"
                        element={<Purchases />}
                    ></Route>
                    <Route
                        path="/sales/:orgId/createwaybill"
                        element={<NewSale />}
                    ></Route>
                    <Route
                        path="/purchases/:orgId/createwaybill"
                        element={<NewPurchase />}
                    ></Route>
                    <Route
                        path="/sales/:orgId/:id"
                        element={<UpdateSale />}
                    ></Route>
                    <Route
                        path="/purchases/:orgId/:id"
                        element={<UpdatePurchase />}
                    ></Route>
                </Routes>
            ) : (
                <Routes>
                    <Route path="/" element={<Tabs />}></Route>
                    <Route path="/calculator" element={<CalcForm />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/login/forgot" element={<Forgot />}></Route>
                    <Route
                        path="/login/registration"
                        element={<Registration />}
                    ></Route>
                    <Route
                        path="*"
                        element={
                            <Navigate
                                to="/login"
                                // replace
                                state={{ from: location }}
                            />
                        }
                    ></Route>
                </Routes>
            )}
        </>
    );
}
