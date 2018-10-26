import * as React from 'react';
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
    value: string;
}

class Todo extends React.PureComponent<{}, IState> {
    constructor(props: object) {
        super(props);
        this.state = {
            filter: 'all',
            left: 0,
            todoList: [],
            value: '',
        };
        this.onChange = this.onChange.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.handleTodoListFilter = this.handleTodoListFilter.bind(this);
        this.handleClearCompleted = this.handleClearCompleted.bind(this);
    }

    public onChangeText(e: any) {
        this.setState({
            value: e.target.value
        });
    }

    public handleAddItem(e: any) {
        if (e.keyCode === 13 && e.target.value !== '') {
            this.setState((prevState: any) => {
                return {
                    todoList: prevState.todoList.concat([{
                        completed: false,
                        content: prevState.value,
                        id: prevState.todoList.length
                    }]),
                    value: ''
                }
            });
            this.handleUpdateLeft();
        }
    }

    public onChange(id: number) {
        this.setState((prevState: any) => {
            return {
                todoList: prevState.todoList.map((todo: ITodo) => {
                    if (todo.id === id) {
                        todo.completed = !todo.completed
                    }
                    return todo
                })
            }
        })
        this.handleUpdateLeft();
    }

    public onDelete(id: number) {
        this.setState((prevState: any, props: any) => {
            return {
                todoList: prevState.todoList.filter((todo: ITodo) => {
                    return todo.id !== id
                })
            }
        })
        this.handleUpdateLeft();
    }

    public handleTodoListFilter(condition: string) {
        this.setState({
            filter: condition
        });
        this.handleUpdateLeft();
    }

    public handleClearCompleted() {
        this.setState((prevState: IState, props: any) => {
            return {
                todoList: prevState.todoList.filter((todo: ITodo) => todo.completed !== true)
            }
        });
        this.handleUpdateLeft();
    }

    public handleUpdateLeft() {
        this.setState((prevState: IState, props: any) => {
            return {
                left: prevState.todoList.filter((todo: ITodo) => {
                    if (prevState.filter === 'active') {
                        return todo.completed === false;
                    } else if (prevState.filter === 'completed') {
                        return todo.completed === true;
                    } else {
                        return true;
                    }
                }).length
            }
        })
    }

    public render() {
        return (
            <section className="real-app">
                <input className="add-input" autoFocus={true} type="text" onKeyDown={this.handleAddItem} onChange={this.onChangeText} value={this.state.value}  placeholder="接下去要做什么？" />
                {
                     this.state.todoList.map((todo: ITodo) => {
                         if (this.state.filter === 'active' && todo.completed === false) {
                             return <Item key={String(todo.id)} todo={todo} onChange={this.onChange} onDelete={this.onDelete} />
                         } else if (this.state.filter === 'completed' && todo.completed === true) {
                             return <Item key={String(todo.id)} todo={todo} onChange={this.onChange} onDelete={this.onDelete} />
                         } else if (this.state.filter === 'all') {
                             return <Item key={String(todo.id)} todo={todo} onChange={this.onChange} onDelete={this.onDelete} />
                         } else {
                             return null;
                         }
                     })
                }
                <Tabs filter={this.state.filter} left={this.state.left} handleTodoListFilter={this.handleTodoListFilter} handleClearCompleted={this.handleClearCompleted} />
            </section>
        );
    }
}

export default Todo;
