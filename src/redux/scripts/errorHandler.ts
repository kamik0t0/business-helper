export function errorHanlder(state: any, action: any): void {
    if (action.payload) {
        state.error = action.payload;
    } else if (action.error.message) {
        state.error = action.error.message;
    }
}
