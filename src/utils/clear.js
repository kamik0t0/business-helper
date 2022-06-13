export function clear() {
    for (const input of document.querySelectorAll("input")) {
        input.value = "";
    }
}

function makeCounter() {
    let counter = 0;
    // @ts-check

    /**
     * @return {number}
     */
    return function () {
        return counter++;
    };
}

let counter1 = makeCounter();
let counter2 = makeCounter();

console.log(counter1);

console.log(counter1());
console.log(counter1());
console.log(counter1());
console.log(counter2());
console.log(counter2());
