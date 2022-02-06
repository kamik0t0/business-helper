import React from "react";
import classes from "./inner.module.css";

export default function Inner() {
    return (
        <div className={classes.content + " " + classes.inner}>
            Приветствую всех на моем "PET"-проекте - Web-приложение "Accounter
            Helper"!
            <br />
            <br />
            <h3>Что сделано?</h3>
            <br />
            <ul>
                <li>
                    <span className={classes.span}>
                        Раздел "Налоговый калькулятор".{" "}
                    </span>{" "}
                    <br />
                    Реализован расчет (итоговая сумма) начисленных налогов по
                    СНО УСН (доходы). Также работает кнопка возврата на главную
                    страницу. Для того чтобы выполнить расчет надо перейти в
                    "Налоговый калькулятор", ввести соответствующие показатели и
                    после снятия фокуса справа в соответствующей графе появится
                    итоговая сумма всех начисленных налогов. Если закрыть
                    браузер или просто обновить страницу, то все введенные цифры
                    также никуда не денутся.
                </li>
                <br />
                <li>
                    <span className={classes.span}>Детализация расчета. </span>{" "}
                    <br /> Если кликнуть на сумму налога, то вы сможете увидеть
                    детализацию расчета. Если снова нажать на калькулятор все
                    введенные вами цифры будут сохранены.
                </li>
                <br />
                <li>
                    <span className={classes.span}>Регистрация. </span>
                    <br /> Пользователь регистрируется в удаленной базе данных
                    по email. Проверка email на "@" и на его фактическое
                    существование - невозможно зарегистрировать некорректный или
                    нереальный почтовый адрес, а также зарегистрироваться
                    дважды. При успешной регистрации на указанный почтовый ящик
                    отправляется уведомление.
                </li>
                <br />
                <li>
                    <span className={classes.span}>
                        Восстановление пароля.{" "}
                    </span>{" "}
                    <br />
                    Реализована возможность восстановить пароль. На указанный
                    email будет отправлено письмо с вашем паролем, который будет
                    возвращен из базы данных.
                </li>
            </ul>
            <br />
            Вы можете также "поиграться" с изменением размера ширины окна
            браузера и контент будет автоматически подстраиваться оставляя
            видимой наиболее важную часть страницы.
            <br />
            <br />
            Что касается реализации, то проект на данный момент использует
            HTML/SCSS/React - на фронте и NodeJS - для серверной части.
            Подключена база данных MongoDB.
        </div>
    );
}
