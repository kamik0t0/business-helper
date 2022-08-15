export const digitInputValidator = (
    event: React.ChangeEvent<HTMLInputElement>,
    isNumber: boolean
) => {
    event.preventDefault();
    if (!isNumber) return;
    const inputData = event.target.value;
    event.target.value = inputData.toString().replace(/[^0-9]/g, "");
};

export const isError = (value: string, length: number): boolean => {
    if (typeof value === "string" && value.toString().length === length) {
        return false;
    } else {
        return true;
    }
};
