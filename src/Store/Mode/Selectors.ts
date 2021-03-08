import { createSelector } from "reselect";
import { State } from "../Types";

const getMode = (state: State) => state.mode;
export const getModeTitle = createSelector([getMode], mode => (mode ? "Add" : "Edit"));
export const isEditableMode = createSelector([getMode], mode => !mode);
