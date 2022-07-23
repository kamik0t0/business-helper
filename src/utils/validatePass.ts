export function validatePass(pass: string) {
    const beginWithoutDigit = /^\D.*$/;
    const withoutSpecialChars = /^[^-() /]*$/;
    const containsLetters = /^.*[a-zA-Z]+.*$/;
    const containsDigits = /^.*[0-9]+.*$/;

    if (
        beginWithoutDigit.test(pass) &&
        withoutSpecialChars.test(pass) &&
        containsLetters.test(pass) &&
        containsDigits.test(pass)
    ) {
        return true;
    } else {
        return false;
    }
}
