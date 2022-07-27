interface prev {
    add: boolean;
    show: boolean;
}

export function modalManager(setModal: (prev: object) => void) {
    function showModal() {
        setModal((prev: prev): object => ({ ...prev, show: true }));
        setTimeout(() => {
            setModal((prev: prev) => ({ ...prev, add: true }));
        }, 0);
    }
    function hideModal() {
        setModal((prev: prev) => ({ ...prev, add: false }));
        setTimeout(() => {
            setModal((prev: prev) => ({ ...prev, show: false }));
        }, 500);
    }
    return [showModal, hideModal];
}
