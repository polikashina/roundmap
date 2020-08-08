export interface ValidationArea {
  title?: string;
  value?: string;
}

export interface IArea {
  id: number;
  title: string;
  value: number;
  color: string;
}

export interface IAreaAdd {
  title: string;
  value: number;
}

export interface IAreaValidation {
  title?: string;
  value?: number;
  id?: number;
}

export interface IAreaValidationError {
  title?: string;
  value?: string;
}

export interface IAreaEdit extends IAreaAdd {
  id: number;
}

export type AreaState = {
  items: IArea[];
  selectedItemId?: number;
  currentItem?: IAreaAdd;
  validationError?: IAreaValidationError;
};

export type State = {
  area: AreaState;
  mode: boolean;
};
