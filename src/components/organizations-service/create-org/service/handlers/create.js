import { checkInnKpp } from "./check-inn-kpp.js";
import { hideAnimatedModal } from "../../../../../UI/modal/service/handlers/modal-control.js";
import { Organizaton } from "../../../../../utils/Org.js";
import { getDataByForeignKey } from "../../../../../utils/getDataByForeignKey.js";

export // запрос на создание новой организации
async function create(
    event,
    organization,
    setLoader,
    setActiveOrg,
    url,
    dispatch,
    setModal,
    type,
    idType
) {
    event.preventDefault();
    // проверка ввода
    if (checkInnKpp(organization) === false) return;
    // добавление в тело запроса id пользователя
    try {
        organization["id"] = localStorage.getItem(idType);
    } catch (error) {
        console.log("Session expired... Authorize again");
    }
    try {
        setLoader(true);
        // отправка запроса
        let response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(organization),
        });
        // получение ответа
        let result = await response.json();
        // если в ответе есть поле created
        if (result.created) {
            // заружаем список организаций из БД
            let [orgs, id] = await getDataByForeignKey(url, idType);
            // выбрали созданную сущность
            let [newOrg] = orgs.filter(
                (org) => org.orgname === organization.orgname
            );
            // установили в качестве активной
            localStorage.setItem(`${type}`, JSON.stringify(newOrg));
            // id
            localStorage.setItem(id, JSON.parse(localStorage.getItem(type)).id);
            // показали в личном кабинете
            setActiveOrg(JSON.parse(localStorage.getItem(`${type}`)));
            // убрали анимацию загрузки
            setLoader(false);
            // анимация модального окна
            hideAnimatedModal(setModal);
            // обновляем поля
            organization = new Organizaton();
        } else {
            setLoader(false);
            hideAnimatedModal(setModal);
            console.log("error", result);
            dispatch({
                type: "isERROR_TRUE",
                payload: true,
                message: "No connection to server",
            });
            // обновляем поля
            organization = new Organizaton();
        }
    } catch (error) {
        // в случае непредвиденной ошибки показываем и выходим из авторизации
        console.log(error);
        setLoader(false);
        dispatch({
            type: "isERROR_TRUE",
            payload: true,
            message: "No connection to server",
        });
        dispatch({ type: "REG_FALSE", payload: false });
        hideAnimatedModal(setModal);
        // обновляем поля
        organization = new Organizaton();
    }
}
