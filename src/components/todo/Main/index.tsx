import * as React from 'react';
import { connect } from 'react-redux';
import * as actionCreator from '../store/actionCreator';
import Item from '../Item';
import Tabs from '../Tabs';
import './index.styl';

interface ITodo {
    completed: boolean;
    content: string;
    id: number;
}

interface IState {
    filterName: string;
    todoList: ITodo[];
    inputValue: string;
}

interface IProps {
    addTodoListItem: () => void;
    changeInputValue: (e: any) => void;
    filterName: string;
    inputValue: string;
    initInputValue: () => void;
    initTodoList: () => void;
    todoList: ITodo[]
}

class Todo extends React.Component<IProps, IState> {
    public componentDidMount() {
        this.props.initInputValue();
        this.props.initTodoList();
    }

    public render() {
        const {addTodoListItem, changeInputValue, filterName, inputValue, todoList} = this.props;
        return (
            <section className="real-app">
                <input className="add-input" autoFocus={true} type="text" value={ inputValue } onChange={ changeInputValue } onKeyDown={ addTodoListItem }  placeholder="接下去要做什么？" />
                {
                    todoList.map((todo: ITodo) => {
                        if (filterName === 'all' || (filterName === 'active' && todo.completed === false) || (filterName === 'completed' && todo.completed === true)) {
                            return <Item key={String(todo.id)} todo={todo} />
                        } else {
                            return null;
                        }
                     })
                }
                <Tabs />
            </section>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        filterName: state.filterName,
        inputValue: state.inputValue,
        todoList: state.todoList
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        initInputValue() {
            dispatch(actionCreator.getInitInputValueAction());
        },
        initTodoList() {
            dispatch(actionCreator.getInitTodoListAction());
        },
        changeInputValue(e: any) {
            dispatch(actionCreator.changeValueAction(e.target.value));
        },
        addTodoListItem(e: any) {
            if (e.keyCode === 13 && e.target.value !== '') {
                dispatch(actionCreator.addTodoListItemAction());
            }

        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
