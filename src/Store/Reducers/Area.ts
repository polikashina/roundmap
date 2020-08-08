import { IAreaAdd, AreaState, IAreaValidationError } from "../Types";

const mapColors: string[] = [
  "#C70039",
  "#FF5733",
  "#FF8D1A",
  "#EDDD53",
  "#57C785",
  "#00BAAD",
  "#2A7B9B",
  "#3D3D6B",
  "#511849",
  "#900C3F",
];

type Action = {
  type: ActionTypes;
  payload: any;
};

const emptyState = {
  items: [],
  // selectedItemId: undefined
};

export enum ActionTypes {
  Edit = "EDIT",
  Add = "ADD",
  Delete = "DELETE",
  Select = "SELECT",
  Async = "ASYNC",
}

const getValidationError = (title: string, value: string): IAreaValidationError => {
  const validationError: IAreaValidationError = {};
  if (!title) {
    validationError.title = "Enter title";
  }

  if (!value) {
    validationError.value = "Enter value";
  }

  if (Number(value) > 10) {
    validationError.value = "Value should be < = 10";
  }

  return validationError;
};

export const areaReducer = (state: AreaState = emptyState, action: Action): AreaState => {
  switch (action.type) {
    case ActionTypes.Add: {
      const { title, value } = action.payload;
      const validationError: IAreaValidationError = getValidationError(title, value);
      const newState = { ...state };

      if (Object.keys(validationError).length) {
        return {
          ...state,
          currentItem: { title, value },
          validationError,
        };
      }

      delete newState.currentItem;
      delete newState.validationError;

      return {
        ...newState,
        items: [...state.items, { title, value, color: mapColors[state.items.length], id: state.items.length }],
      };
    }
    case ActionTypes.Edit: {
      const { title, value } = action.payload;
      const validationError: IAreaValidationError = getValidationError(title, value);

      if (Object.keys(validationError).length) {
        return {
          ...state,
          currentItem: { title, value },
          validationError,
        };
      }

      const newState = { ...state };
      const { items, selectedItemId } = state;
      const currentItemIndex = selectedItemId!;
      const newItems = [
        ...items.slice(0, selectedItemId),
        {
          ...items[currentItemIndex],
          title,
          value,
        },
        ...items.slice(currentItemIndex + 1),
      ];

      delete newState.validationError;

      return {
        ...newState,
        items: newItems,
      };
    }
    case ActionTypes.Delete: {
      const { items, selectedItemId } = state;
      const currentItemIndex = selectedItemId!;
      const newItems = [...items.slice(0, currentItemIndex), ...items.slice(currentItemIndex + 1)];
      const newState = { ...state };

      delete newState.currentItem;
      delete newState.validationError;
      delete newState.selectedItemId;

      return {
        ...newState,
        items: newItems,
      };
    }
    case ActionTypes.Select:
      if (!action.payload) {
        const newState = { ...state };

        delete newState.currentItem;
        delete newState.validationError;
        delete newState.selectedItemId;

        return newState;
      }
      const { id } = action.payload;
      const findItem = (itemId: number): IAreaAdd | undefined => {
        return state.items.find(item => {
          const { id, title, value } = item;

          if (id === itemId) {
            return { title, value };
          }
        });
      };

      return {
        ...state,
        currentItem: findItem(id),
        selectedItemId: id,
      };
    default:
      return state;
  }
};
