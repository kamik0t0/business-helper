export function modalManager(setModal) {
    function showModal() {
        setModal((prev) => {
            return { ...prev, show: true };
        });
        setTimeout(() => {
            setModal((prev) => {
                return { ...prev, add: true };
            });
        }, 0);
    }
    function hideModal() {
        setModal((prev) => {
            return { ...prev, add: false };
        });
        setTimeout(() => {
            setModal((prev) => {
                return { ...prev, show: false };
            });
        }, 500);
    }
    return [showModal, hideModal];
}
