import * as React from 'react';
import * as actionCreator from '../store/actionCreator';
import store from '../store';
import Item from '../Item';
import Tabs from '../Tabs';
import './index.styl';

interface ITodo {
    completed: boolean;
    content: string;
    id: number;
}

interface IState {
    filter: string;
    left: number;
    todoList: ITodo[];
    inputValue: string;
}

class Todo extends React.Component<{}, IState> {
    constructor(props: object) {
        super(props);
        this.state = store.getState();

        // 可以手动订阅更新，也可以事件绑定到视图层。
        store.subscribe(() => this.handleStoreChange());

        this.handleStoreChange = this.handleStoreChange.bind(this);
    }

    public handleStoreChange() {
        this.setState(store.getState());
    }

    public onChangeInputValue(e: any) {
        const action = actionCreator.changeValueAction(e.target.value);
        store.dispatch(action);
    }

    public handleAddTodoListItem(e: any) {
        if (e.keyCode === 13 && e.target.value !== '') {
            const action = actionCreator.addTodoListItemAction();
            store.dispatch(action);
        }
    }

    public onChangeTodoListItemState(id: number) {
        const action = actionCreator.changeTodoListItemStateAction(id);
        store.dispatch(action);
    }

    public onDeleteTodoListItem(id: number) {
        const action = actionCreator.deleteTodoListItemAction(id);
        store.dispatch(action);
    }

    public handleTodoListFilter(condition: string) {
        const action = actionCreator.handleTodoListFilterAction(condition);
        store.dispatch(action);
    }

    public handleClearCompleted() {
        const action = actionCreator.handleTodoListClearAction();
        store.dispatch(action);
    }

    public componentDidMount() {
        const getInitInputValueAction = actionCreator.getInitInputValueAction();
        store.dispatch(getInitInputValueAction);
        const getInitTodoListAction = actionCreator.getInitTodoListAction();
        store.dispatch(getInitTodoListAction);
    }

    public render() {
        const {filter, inputValue, left, todoList} = this.state;
        return (
            <section className="real-app">
                <input className="add-input" autoFocus={true} type="text" onKeyDown={this.handleAddTodoListItem} onChange={this.onChangeInputValue} value={inputValue}  placeholder="接下去要做什么？" />
                {
                    todoList.map((todo: ITodo) => {
                         if (filter === 'active' && todo.completed === false) {
                             return <Item key={String(todo.id)} todo={todo} onChangeTodoListItemState={this.onChangeTodoListItemState} onDeleteTodoListItem={this.onDeleteTodoListItem} />
                         } else if (filter === 'completed' && todo.completed === true) {
                             return <Item key={String(todo.id)} todo={todo} onChangeTodoListItemState={this.onChangeTodoListItemState} onDeleteTodoListItem={this.onDeleteTodoListItem} />
                         } else if (filter === 'all') {
                             return <Item key={String(todo.id)} todo={todo} onChangeTodoListItemState={this.onChangeTodoListItemState} onDeleteTodoListItem={this.onDeleteTodoListItem} />
                         } else {
                             return null;
                         }
                     })
                }
                <Tabs filter={filter} left={left} handleTodoListFilter={this.handleTodoListFilter} handleClearCompleted={this.handleClearCompleted} />
            </section>
        );
    }
}

export default Todo;
