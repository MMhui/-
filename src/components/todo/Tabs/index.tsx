import * as React from 'react';
import { connect } from 'react-redux';
import * as actionCreator from "../store/actionCreator";
import './index.styl';

interface IProps {
    filterName: string;
    left: number;
    tabs: string[];
    handleTodoListFilter: (filterName: string) => void;
    handleClearCompleted: () => void;
}

interface IState {
    filterName: string;
    left: number;
    tabs: string[];
}

class Tabs extends React.PureComponent<IProps, IState> {

    public render() {
        const { filterName, handleTodoListFilter, handleClearCompleted, left, tabs } = this.props;
        return (
            <div className="helper">
                <span className="left">{ left } items left</span>
                <span className="tabs">
                    {
                        tabs.map((ele: any) => <span className={filterName === ele ? 'state actived' : 'state'} onClick={() => handleTodoListFilter(ele)} key={ele}>{ele}</span>)
                    }
                </span>
                <span className="clear" onClick={ handleClearCompleted }>Clear Completed!</span>
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        filterName: state.filterName,
        left: state.left,
        tabs: state.tabs
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        handleTodoListFilter(filterName: string) {
            dispatch(actionCreator.handleTodoListFilterAction(filterName));
        },
        handleClearCompleted() {
            dispatch(actionCreator.handleTodoListClearAction());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);