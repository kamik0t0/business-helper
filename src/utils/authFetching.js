export async function authFetching(url, dispatch, token) {
    // получаем token из localStorage при его наличии
    try {
        if (token) {
            let response = await fetch(url, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            let result = await response.json();
            console.log(result.auth);
            // если авторизация успешна...
            if (result.auth) {
                // меняем состояние в redux
                dispatch({ type: "REG_TRUE", payload: true });
                // сообщаем
                // console.log(result.message);
            } else {
                // меняем состояние в redux
                dispatch({ type: "REG_FALSE", payload: false });
                // удаляем token в localStorage
                const keys = Object.keys(localStorage);
                for (const key of keys) {
                    if (key !== "currentOrg") {
                        localStorage.removeItem(key);
                    }
                }

                // если ошибка - сообщаем
                console.log("Session expired. " + result.message);
            }
        }
    } catch (error) {
        console.log(error);
        console.log("No connection to server");
    }
}
