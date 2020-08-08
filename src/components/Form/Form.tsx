import React, { useState, useEffect } from "react";
import { Input, InputType } from "../Input/Input";
import { Button } from "../Button/Button";
import "./Form.scss";
import { connect } from "react-redux";
import { State, IAreaAdd, IAreaValidation, IAreaValidationError } from "../../Store/Types";
import { getModeTitle, isEditableMode } from "../../Store/Reducers/Mode";
import { ActionTypes } from "../../Store/Reducers/Area";

type Props = StateProps & DispatchProps;

const FormPresenter: React.FC<Props> = props => {
  const { isEdit, modeTitle, currentItem, selectedItemId, validationError, add, edit } = props;
  const [title, setTitle] = useState<string | undefined>("");
  const [value, setValue] = useState<number | undefined>(undefined);

  useEffect(() => {
    setTitle(currentItem ? currentItem.title : "");
    setValue(currentItem ? currentItem.value : undefined);
  }, [currentItem]);

  const onSave = () => {
    if (isEdit) {
      edit({ title, value, id: selectedItemId! });
    } else {
      add({ title, value });
      setTitle("");
      setValue(undefined);
    }
  };

  const titleChangeHandler = (value: string) => {
    setTitle(value);
  };

  const valueChangeHandler = (value: number) => {
    setValue(value);
  };

  return (
    <div className="form">
      <h3>{modeTitle} area</h3>
      <Input
        className="form__input"
        value={title || ""}
        error={validationError?.title}
        placeholder="title"
        type={InputType.Text}
        onChange={titleChangeHandler}
      />
      <Input
        className="form__input"
        value={value !== undefined ? String(value) : ""}
        error={validationError?.value}
        placeholder="value"
        type={InputType.Number}
        onChange={valueChangeHandler}
      />
      <Button className="form__button" onClick={onSave}>
        Save
      </Button>
    </div>
  );
};

type StateProps = {
  isEdit: boolean;
  modeTitle: string;
  currentItem?: IAreaAdd;
  selectedItemId?: number;
  validationError?: IAreaValidationError;
};

type DispatchProps = {
  add: (payload: IAreaValidation) => void;
  edit: (payload: IAreaValidation) => void;
};

const mapStateToProps = (state: State): StateProps => {
  const { mode } = state;
  const isEdit = isEditableMode(mode);
  const { currentItem, selectedItemId, validationError } = state.area;
  return {
    isEdit,
    currentItem,
    selectedItemId,
    modeTitle: getModeTitle(mode),
    validationError,
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    add: (payload: IAreaValidation) => dispatch({ type: ActionTypes.Add, payload }),
    edit: (payload: IAreaValidation) => dispatch({ type: ActionTypes.Edit, payload }),
  };
};

export const Form = connect(mapStateToProps, mapDispatchToProps)(FormPresenter);
