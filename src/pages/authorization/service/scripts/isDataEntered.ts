export function isDataEntered(userInput: string): boolean {
    if (userInput.trim().length === 0) {
        return false;
    }
    return true;
}
