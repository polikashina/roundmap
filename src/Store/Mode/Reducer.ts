export enum ActionTypes {
    Change = "CHANGE",
}
type ModeAction = {
    type: ActionTypes;
    isEdit: boolean;
};

// true - add, false - edit
export const modeReducer = (state: boolean = true, action: ModeAction): boolean => {
    switch (action.type) {
        case ActionTypes.Change:
            return !action.isEdit;
        default:
            return state;
    }
};
