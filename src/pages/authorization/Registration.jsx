import classes from "./styles/auth.module.css";
import classNames from "classnames/bind";
import Loader from "../../UI/Loader/Loader.jsx";
import MyInput from "../../UI/input/MyInput/MyInput.jsx";
import MyLink from "../../UI/link/MyLink.jsx";
import { loaderStyle, submitStyle } from "./service/inlineStyles";
import { useUser } from "./service/hooks/useUser";
import { useForm } from "./service/hooks/useForm";

export default function Registration() {
    const USER = useUser();
    const FORM = useForm();

    const addUser = (event) => USER.reg(event, FORM.email, FORM.pass);

    const cx = classNames.bind(classes);
    const authErrUser = cx({
        [classes.login_auth_user_input]: true,
        [classes.wrong]: USER.inputError,
    });
    const authErrPass = cx({
        [classes.login_auth_pass_input]: true,
        [classes.wrong]: USER.inputError,
    });
    const passVisibility = cx({
        [classes.login_auth_pass_eye]: FORM.isVisible,
        [classes.login_auth_pass_eye_close]: !FORM.isVisible,
    });

    return (
        <>
            <>
                <div className={classes.login}>
                    <form
                        ref={FORM.form}
                        onSubmit={addUser}
                        name="auth"
                        id="auth"
                        className={classes.login_frame}
                    >
                        <div className={classes.login_header}>Регистрация</div>
                        {USER.loader ? (
                            <Loader style={loaderStyle} />
                        ) : (
                            <div className={classes.login_auth}>
                                <div className={classes.login_auth_user}>
                                    <div
                                        className={classes.login_auth_user_icon}
                                    ></div>
                                    <input
                                        defaultValue={FORM.email.current}
                                        onChange={FORM.setEmail}
                                        name="email"
                                        type="email"
                                        className={authErrUser}
                                        placeholder="E-mail"
                                    />
                                </div>
                                <div className={classes.login_auth_pass}>
                                    <div
                                        className={classes.login_auth_pass_icon}
                                    ></div>
                                    <input
                                        defaultValue={FORM.pass.current}
                                        minLength={10}
                                        onChange={FORM.setPass}
                                        name="pass"
                                        type="password"
                                        className={authErrPass}
                                        placeholder="Password"
                                    />
                                    <div
                                        onMouseDown={FORM.showPass}
                                        onMouseUp={FORM.hidePass}
                                        className={passVisibility}
                                    ></div>
                                </div>
                                <MyInput
                                    type="submit"
                                    value="Зарегистрироваться"
                                    style={submitStyle}
                                />
                            </div>
                        )}

                        <div className={classes.login_reg}>
                            <div className={classes.login_reg_registration}>
                                <MyLink
                                    style={{ color: "#0D1320" }}
                                    path="/login"
                                >
                                    Авторизация
                                </MyLink>
                            </div>
                            <div className={classes.login_reg_registration}>
                                <MyLink
                                    style={{ color: "#0D1320" }}
                                    path="/login/forgot"
                                >
                                    Забыли пароль?
                                </MyLink>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        </>
    );
}
