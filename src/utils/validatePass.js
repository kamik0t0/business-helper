export function validatePass(pass) {
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
        console.log("pass");
        return true;
    } else {
        console.log("no pass");
        return false;
    }
}
