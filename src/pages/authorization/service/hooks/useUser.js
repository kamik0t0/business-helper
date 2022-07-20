import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { validatePass } from "../../../../utils/validatePass.js";
import { isDataEntered } from "../scripts/isDataEntered.ts";
import * as UserAPI from "../../../../redux/actions/UserActions";
import { getOrgsByUserId } from "../../../../redux/actions/OrgsAction";
import { useTypedDispatch } from "../../../../redux/hooks/hooks";
import { getCounterpatiesByOrgId } from "../../../../redux/actions/CounterpartiesAction.ts";
import { getSalesByOrgId } from "../../../../redux/actions/SalesAction";
import { getPurchasesByOrgId } from "../../../../redux/actions/PurchasesAction";
import { setUserOrg } from "../../../../redux/reducers/orgsSlice";
import { setInvoice } from "../../../../redux/reducers/InvoiceSlice";

export function useUser() {
    const dispatch = useTypedDispatch();
    const [inputError, setInputError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || "/";
    const search = location.state?.from?.search;
    const [, , orgId, invoiceId] = fromPage.split("/");
    // регистрация
    // -------------------------------------------------------------------------
    async function reg(event, email, pass) {
        event.preventDefault();
        const user = new FormData();
        user.set("email", email.current.trim());
        user.set("pass", pass.current.trim());

        if (
            !isDataEntered(user.get("email")) ||
            !isDataEntered(user.get("pass"))
        ) {
            setInputError("Введите пароль и логин");
            return;
        }

        if (!validatePass(user.get("pass"))) {
            setInputError(
                "Пароль должен содержать буквы и цифры. Не должен начинаться с цифры. Не должен содержать: пробел  - ( )  /"
            );
            return;
        }

        const { payload: USER } = await dispatch(UserAPI.postUser(user));

        typeof USER === "string" && setInputError(USER);
        USER.regerror && setInputError(USER.regerror);
        USER.registered && navigate("/login");
    }
    // восстановление
    // -------------------------------------------------------------------------
    async function recover(event, email, pass, repeatPass) {
        event.preventDefault();

        const user = new FormData();
        user.set("email", email.current.trim());
        user.set("pass", pass.current.trim());
        user.set("repeatPass", repeatPass.current.trim());
        // проверка на ввод
        if (
            !isDataEntered(user.get("email")) ||
            !isDataEntered(user.get("pass")) ||
            !isDataEntered(user.get("repeatPass"))
        ) {
            setInputError("Введите пароль, новый пароль и логин");
            return;
        }
        // сравнение паролей
        if (user.get("repeatPass").localeCompare(user.get("pass")) !== 0)
            return setInputError("Пароли не совпадают!");
        // проверка на соответствие шаблону
        if (!validatePass(user.get("pass")))
            return setInputError(
                "Пароль должен содержать буквы и цифры. Не должен начинаться с цифры. Не должен содержать: пробел  - ( )  /"
            );

        const { payload: USER } = await dispatch(UserAPI.updateUser(user));
        typeof USER === "string" && setInputError(USER);
        USER.updated && navigate("/login");
    }
    // авторизация
    // -------------------------------------------------------------------------
    async function auth(event, email, pass) {
        event.preventDefault();

        const user = new FormData();
        user.set("email", email.current.trim());
        user.set("pass", pass.current.trim());

        if (
            !isDataEntered(user.get("email")) ||
            !isDataEntered(user.get("pass"))
        ) {
            setInputError("Введите пароль и логин");
            return;
        }

        // авторизация с редиректом на главную страницу
        const { payload: USER } = await dispatch(UserAPI.getUser(user));
        if (typeof USER === "string") return setInputError(USER);

        const { payload: ORGS } = await dispatch(getOrgsByUserId(USER.id));
        if (typeof ORGS === "string") return setInputError(USER);
        // авторизация с возвратом на страницу
        if (orgId) {
            const { payload: ORGID } = dispatch(setUserOrg(+orgId));
            if (!ORGID) return navigate("/private");

            await dispatch(getCounterpatiesByOrgId(+orgId));
            const { payload: Sales } = await dispatch(getSalesByOrgId(+orgId));
            const { payload: Purchases } = await dispatch(
                getPurchasesByOrgId(+orgId)
            );

            // редирект к накладной
            if (invoiceId) {
                const invoice = [...Sales, ...Purchases].find(
                    (invoice) => invoice.id === +invoiceId
                );

                dispatch(setInvoice(invoice));
            }
            return navigate(`${fromPage}${search}`);
        }
        navigate("/");
    }

    const USER = { recover, reg, auth, inputError };

    return USER;
}
