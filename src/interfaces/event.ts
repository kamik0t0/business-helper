export interface IEvent {
    preventDefault: () => {};
    target: { value: string | number | boolean };
}
