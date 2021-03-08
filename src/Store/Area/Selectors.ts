import { createSelector } from "reselect";
import { State } from "../Types";

export const getAreas = createSelector(
    (state: State) => state.area.items,
    items => items,
);
export const getValidationError = createSelector(
    (state: State) => state.area.validationError,
    validationError => validationError,
);

export const getCurrentItem = createSelector(
    (state: State) => state.area.currentItem,
    currentItem => currentItem,
);

export const getSelectedItemId = createSelector(
    (state: State) => state.area.selectedItemId,
    selectedItemId => selectedItemId,
);
