import { useState, useRef } from "react";
import { IEvent } from "../../../../interfaces/event";
import { MutableRefObject } from "react";

export function useForm() {
    const form: MutableRefObject<HTMLFormElement | undefined> = useRef();
    const email: MutableRefObject<string> = useRef("Cap_NEMOx86@inbox.ru");
    const pass: MutableRefObject<string> = useRef("kdkfjdilkmf2312387");
    const repeatPass: MutableRefObject<string> = useRef("kdkfjdilkmf2312387");

    const [isVisible, setIsVisible] = useState(false);

    const setEmail = (event: IEvent) => {
        email.current = event.target.value as string;
    };
    const setPass = (event: IEvent) => {
        pass.current = event.target.value as string;
    };
    const setRepeatedPass = (event: IEvent) => {
        repeatPass.current = event.target.value as string;
    };

    const showPass = () => {
        form.current !== undefined &&
            form.current.pass.setAttribute("type", "text");
        setIsVisible(!isVisible);
    };
    const hidePass = () => {
        form.current !== undefined &&
            form.current.pass.setAttribute("type", "password");
        setIsVisible(!isVisible);
    };
    function showRepeatedPass() {
        form.current !== undefined &&
            form.current.pass.setAttribute("type", "text");
        form.current !== undefined &&
            form.current.repeatPass.setAttribute("type", "text");
        setIsVisible(true);
    }

    function hideRepeatePass() {
        form.current !== undefined &&
            form.current.pass.setAttribute("type", "password");
        form.current !== undefined &&
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
