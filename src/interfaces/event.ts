export interface IEvent {
    preventDefault: () => {};
    target: {
        innerHTML: string;
        value: string | number | boolean;
    };
}
