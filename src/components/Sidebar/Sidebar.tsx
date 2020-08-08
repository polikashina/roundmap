import React from "react";
import { Form } from "../Form/Form";
import { Button } from "../Button/Button";
import { connect } from "react-redux";
import { State } from "../../Store/Types";
import { isEditableMode } from "../../Store/Reducers/Mode";
import { ActionTypes } from "../../Store/Reducers/Area";
import { ActionTypes as ModeActionTypes } from "../../Store/Reducers/Mode";

type Props = StateProps & DispatchProps;

const SidebarPresenter: React.FC<Props> = props => {
  const { isEditingMode, changeMode, selectItem, deleteItem } = props;

  const addNewAreaHandler = () => {
    changeMode(false);
    selectItem();
  };

  const deleteHandler = () => {
    changeMode(false);
    deleteItem();
  };

  return (
    <div>
      <Form />
      {isEditingMode && (
        <>
          <Button onClick={deleteHandler}>Delete</Button>
          <br />
          <br />
          <Button onClick={addNewAreaHandler}>Add new area</Button>
        </>
      )}
    </div>
  );
};

type StateProps = {
  isEditingMode: boolean;
};

const mapStateToProps = (state: State): StateProps => {
  return {
    isEditingMode: isEditableMode(state.mode),
  };
};

type DispatchProps = {
  changeMode: (isEdit: boolean) => void;
  selectItem: () => void;
  deleteItem: () => void;
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    changeMode: (isEdit: boolean) => dispatch({ type: ModeActionTypes.Change, isEdit }),
    selectItem: () => dispatch({ type: ActionTypes.Select }),
    deleteItem: () => dispatch({ type: ActionTypes.Delete }),
  };
};

export const Sidebar = connect(mapStateToProps, mapDispatchToProps)(SidebarPresenter);
