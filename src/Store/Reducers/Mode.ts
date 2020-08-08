import { createSelector } from "reselect";

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

// selector
const getMode = (state: boolean) => state;
export const getModeTitle = createSelector([getMode], mode => (mode ? "Add" : "Edit"));
export const isEditableMode = createSelector([getMode], mode => !mode);
