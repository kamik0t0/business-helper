import React, { useState, useRef } from "react";

export function useForm() {
    const form = useRef<HTMLFormElement>(null!);
    const email = useRef<string>("Cap_NEMOx86@inbox.ru");
    const pass = useRef<string>("kdkfjdilkmf2312387");
    const repeatPass = useRef<string>("kdkfjdilkmf2312387");

    const [isVisible, setIsVisible] = useState(false);

    const setEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        email.current = event.target.value as string;
    };
    const setPass = (event: React.ChangeEvent<HTMLInputElement>) => {
        pass.current = event.target.value as string;
    };
    const setRepeatedPass = (event: React.ChangeEvent<HTMLInputElement>) => {
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
