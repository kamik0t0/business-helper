interface Iclear {
    (): void;
}

export let clear: Iclear;

clear = function (): void {
    for (
        let index = 0;
        index < document.querySelectorAll("input").length;
        index++
    ) {
        const element = document.querySelectorAll("input")[index];
        element.value = "";
    }
};
