import { MutableRefObject, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IEvent } from "../../../../interfaces/event";
import { IInvoice } from "../../../../interfaces/invoice";
import { getCounterpatiesByOrgId } from "../../../../redux/actions/CounterpartiesAction";
import { getOrgsByUserId } from "../../../../redux/actions/OrgsAction";
import { getPurchasesByOrgId } from "../../../../redux/actions/PurchasesAction";
import { getSalesByOrgId } from "../../../../redux/actions/SalesAction";
import * as UserAPI from "../../../../redux/actions/UserActions";
import { useTypedDispatch } from "../../../../redux/hooks/hooks";
import { setInvoice } from "../../../../redux/reducers/InvoiceSlice";
import { setUserOrg } from "../../../../redux/reducers/orgsSlice";
import { validatePass } from "../../../../utils/validatePass";
import { isDataEntered } from "../scripts/isDataEntered";

interface LocationState {
    from: {
        pathname: string;
        search: string;
    };
}

export function useUser() {
    const dispatch = useTypedDispatch();
    const [inputError, setInputError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState;
    const fromPage = state?.from?.pathname || "/";
    const search = state?.from?.search;
    const [, , orgId, invoiceId] = fromPage.split("/");

    // регистрация
    // -------------------------------------------------------------------------
    async function reg(
        event: IEvent,
        email: MutableRefObject<string>,
        pass: MutableRefObject<string>
    ) {
        event.preventDefault();
        const user = new FormData();
        user.set("email", email.current.trim());
        user.set("pass", pass.current.trim());

        if (user.get("email") && user.get("pass")) {
            if (!isDataEntered(email.current) || !isDataEntered(pass.current)) {
                setInputError("Введите пароль и логин");
                return;
            }
        }

        if (!validatePass(pass.current)) {
            setInputError(
                "Пароль должен содержать буквы и цифры. Не должен начинаться с цифры. Не должен содержать: пробел  - ( )  /"
            );
            return;
        }

        const { payload: USER } = await dispatch(UserAPI.postUser(user));

        typeof USER === "string" && setInputError(USER);
        typeof USER === "object" &&
            USER.regerror &&
            setInputError(USER.regerror);
        typeof USER === "object" && USER.registered && navigate("/login");
    }

    // восстановление
    // -------------------------------------------------------------------------
    async function recover(
        event: IEvent,
        email: MutableRefObject<string>,
        pass: MutableRefObject<string>,
        repeatPass: MutableRefObject<string>
    ) {
        event.preventDefault();

        const user = new FormData();
        user.set("email", email.current.trim());
        user.set("pass", pass.current.trim());
        user.set("repeatPass", repeatPass.current.trim());
        // проверка на ввод
        if (
            !isDataEntered(email.current) ||
            !isDataEntered(pass.current) ||
            !isDataEntered(repeatPass.current)
        ) {
            setInputError("Введите пароль, новый пароль и логин");
            return;
        }
        // сравнение паролей
        if (email.current.localeCompare(pass.current) !== 0)
            return setInputError("Пароли не совпадают!");
        // проверка на соответствие шаблону
        if (!validatePass(pass.current))
            return setInputError(
                "Пароль должен содержать буквы и цифры. Не должен начинаться с цифры. Не должен содержать: пробел  - ( )  /"
            );

        const { payload: USER } = await dispatch(UserAPI.updateUser(user));
        typeof USER === "string" && setInputError(USER);
        typeof USER === "object" && USER.updated && navigate("/login");
    }

    // авторизация
    // -------------------------------------------------------------------------
    async function auth(
        event: IEvent,
        email: MutableRefObject<string>,
        pass: MutableRefObject<string>
    ) {
        event.preventDefault();

        const user = new FormData();
        user.set("email", email.current.trim());
        user.set("pass", pass.current.trim());

        if (!isDataEntered(email.current) || !isDataEntered(pass.current)) {
            setInputError("Введите пароль и логин");
            return;
        }

        // авторизация с редиректом на главную страницу
        const { payload: USER } = await dispatch(UserAPI.getUser(user));
        if (typeof USER === "string") return setInputError(USER);

        if (USER != null) {
            const { payload: ORGS } = await dispatch(getOrgsByUserId(USER.id));

            if (typeof ORGS === "string") return setInputError(ORGS);
            // авторизация с возвратом на страницу
            if (orgId) {
                const { payload: ORGID } = dispatch(setUserOrg(+orgId));
                if (!ORGID) return navigate("/private");

                await dispatch(getCounterpatiesByOrgId(+orgId));

                const { payload: Sales } = (await dispatch(
                    getSalesByOrgId(+orgId)
                )) as { payload: IInvoice[] };

                const { payload: Purchases } = (await dispatch(
                    getPurchasesByOrgId(+orgId)
                )) as { payload: IInvoice[] };

                // редирект к накладной
                if (invoiceId) {
                    const invoice: IInvoice | undefined = [
                        ...Sales,
                        ...Purchases,
                    ].find((invoice) => invoice.id === +invoiceId);

                    if (invoice) {
                        dispatch(setInvoice(invoice));
                    }
                }
                return navigate(`${fromPage}${search}`);
            }
        }

        navigate("/");
    }

    return { recover, reg, auth, inputError };
}
