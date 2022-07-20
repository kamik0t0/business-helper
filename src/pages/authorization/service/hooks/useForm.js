import { useState, useRef } from "react";

export function useForm() {
    const form = useRef();
    const email = useRef("Cap_NEMOx86@inbox.ru");
    const pass = useRef("kdkfjdilkmf2312387");
    const repeatPass = useRef("kdkfjdilkmf2312387");

    const [isVisible, setIsVisible] = useState(false);

    const setEmail = (event) => {
        email.current = event.target.value;
    };
    const setPass = (event) => {
        pass.current = event.target.value;
    };
    const setRepeatedPass = (event) => {
        repeatPass.current = event.target.value;
    };

    const showPass = () => {
        form.current.pass.setAttribute("type", "text");
        setIsVisible(!isVisible);
    };
    const hidePass = () => {
        form.current.pass.setAttribute("type", "password");
        setIsVisible(!isVisible);
    };
    function showRepeatedPass() {
        form.current.pass.setAttribute("type", "text");
        form.current.repeatPass.setAttribute("type", "text");
        setIsVisible(true);
    }

    function hideRepeatePass() {
        form.current.pass.setAttribute("type", "password");
        form.current.repeatPass.setAttribute("type", "password");
        setIsVisible(false);
    }

    return {
        isVisible,
        setEmail,
        setPass,
        showPass,
        hidePass,
        showRepeatedPass,
        hideRepeatePass,
        setRepeatedPass,
        email,
        pass,
        form,
        repeatPass,
    };
}
