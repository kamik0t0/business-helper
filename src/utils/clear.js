export function clear() {
    for (const input of document.querySelectorAll("input")) {
        input.value = "";
    }
}

let arr = [1, 2, 3, 4, 5, 6, 7];

console.log(arr.filter(inBetween(3, 6))); // 3,4,5,6

console.log(arr.filter(inArray([1, 2, 10]))); // 1,2

function inBetween(a, b) {
    return (item) => item >= a && item <= b;
}
