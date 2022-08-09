import classNames from "classnames/bind";
import { useTypedSelector } from "../../redux/hooks/hooks";
import TextField from "../../UI/input/TextField/TextField";
import Link from "../../UI/Link/Link.jsx";
import Loader from "../../UI/Loader/Loader.jsx";
import { useForm } from "./service/hooks/useForm";
import { useUser } from "./service/hooks/useUser";
import { loaderStyle, submitStyle } from "./service/inlineStyles";
import classes from "./styles/auth.module.css";

export default function Registration() {
    const { reg, inputError } = useUser();
    const FORM = useForm();

    const { isLoading } = useTypedSelector((state) => state.userReducer);

    const addUser = (event) => reg(event, FORM.email, FORM.pass);

    const cx = classNames.bind(classes);
    const authErrUser = cx({
        [classes.login_auth_user_input]: true,
        [classes.wrong]: inputError,
    });
    const authErrPass = cx({
        [classes.login_auth_pass_input]: true,
        [classes.wrong]: inputError,
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
                        {isLoading ? (
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
                                <TextField
                                    type="submit"
                                    value="Зарегистрироваться"
                                    style={submitStyle}
                                />
                            </div>
                        )}

                        <div className={classes.login_reg}>
                            <div className={classes.login_reg_registration}>
                                <Link
                                    style={{ color: "#0D1320" }}
                                    path="/login"
                                >
                                    Авторизация
                                </Link>
                            </div>
                            <div className={classes.login_reg_registration}>
                                <Link
                                    style={{ color: "#0D1320" }}
                                    path="/login/forgot"
                                >
                                    Забыли пароль?
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        </>
    );
}
