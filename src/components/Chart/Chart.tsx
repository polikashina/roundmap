import React from "react";
import { connect } from "react-redux";
import { State, IArea } from "../../Store/Types";
import cn from "classnames";
import { PieChart } from "../PieChart/PieChart";
import { ActionTypes } from "../../Store/Area/Reducer";
import { ActionTypes as ModeActionTypes } from "../../Store/Mode/Reducer";
import { getAreas } from "../../Store/Area/Selectors";

type OwnProps = {
    className?: string;
};

type StateProps = {
    items: IArea[];
};

type Props = StateProps & OwnProps & DispatchProps;

const ChartPresenter: React.FC<Props> = props => {
    const { className, items, selectArea, changeMode } = props;

    const onClickHandler = (id: number) => {
        changeMode(true);
        const selectedId = items.find(item => item.id === id);
        if (selectedId) {
            selectArea(selectedId.id);
        }
    };

    return (
        <div className={cn("chart", className)}>
            <PieChart items={items} viewBoxSize={400} onClick={onClickHandler} />
        </div>
    );
};

const mapStateToProps = (state: State): StateProps => {
    return {
        items: getAreas(state),
    };
};

type DispatchProps = {
    changeMode: (isEdit: boolean) => void;
    selectArea: (id: number) => void;
};

// TODO: type
const mapDispatchToProps = (dispatch: any): DispatchProps => {
    return {
        changeMode: (isEdit: boolean) => dispatch({ type: ModeActionTypes.Change, isEdit }),
        selectArea: (id: number) => dispatch({ type: ActionTypes.Select, payload: { id } }),
    };
};

const Chart = connect(mapStateToProps, mapDispatchToProps)(ChartPresenter);

export { Chart };
