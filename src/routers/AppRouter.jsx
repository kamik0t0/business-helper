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
import Layout from "../blocks/layout/Layout.jsx";
import UnAuthLayout from "../blocks/layout/noAuthLayout.jsx";

export default function AppRouter() {
    const isAuth = useTypedSelector((state) => state.authReducer.isAuth);
    const location = useLocation();
    return (
        <>
            {isAuth ? (
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Tabs />} />
                        <Route path="calculator" element={<CalcForm />} />
                        <Route path="private" element={<Private />} />
                        <Route
                            path="counterparties/:orgId"
                            element={<Counterparties />}
                        />
                        <Route path="sales/:orgId" element={<Sales />} />
                        <Route
                            path="purchases/:orgId"
                            element={<Purchases />}
                        />
                        <Route
                            path="sales/:orgId/createwaybill"
                            element={<NewSale />}
                        />
                        <Route
                            path="purchases/:orgId/createwaybill"
                            element={<NewPurchase />}
                        />
                        <Route
                            path="sales/:orgId/:id"
                            element={<UpdateSale />}
                        />
                        <Route
                            path="purchases/:orgId/:id"
                            element={<UpdatePurchase />}
                        />
                    </Route>
                </Routes>
            ) : (
                <Routes>
                    <Route path="/" element={<UnAuthLayout />}>
                        <Route index element={<Tabs />} />
                        <Route path="calculator" element={<CalcForm />} />
                        <Route path="login" element={<Login />} />
                        <Route path="login/forgot" element={<Forgot />} />
                        <Route
                            path="login/registration"
                            element={<Registration />}
                        />
                        <Route
                            path="*"
                            element={
                                <Navigate
                                    to="login"
                                    // replace
                                    state={{ from: location }}
                                />
                            }
                        />
                    </Route>
                </Routes>
            )}
        </>
    );
}
