import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "../blocks/layout/Layout";
import UnAuthLayout from "../blocks/layout/noAuthLayout";
import Login from "../pages/authorization/Authorization";
import Forgot from "../pages/authorization/Forgot";
import Registration from "../pages/authorization/Registration";
import Counterparties from "../pages/counterparties/counterparties";
import Tabs from "../pages/info/info";
import Private from "../pages/private-office/private-office";
import NewPurchase from "../pages/purchases/New-purchase";
import Purchases from "../pages/purchases/Purchases";
import UpdatePurchase from "../pages/purchases/Update-purchase";
import NewSale from "../pages/sales/New-sale";
import Sales from "../pages/sales/Sales";
import UpdateSale from "../pages/sales/Update-sale";
import CalcForm from "../pages/Tax-calc/Tax-calc-form";
import { useTypedSelector } from "../redux/hooks/hooks";

// TODO: переписать роутинг на enum и массив приватных и публичных маршрутов

const AppRouter: React.FC = () => {
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
};
export default AppRouter;
