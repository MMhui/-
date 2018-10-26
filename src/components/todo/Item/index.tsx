import * as React from 'react';
import './index.styl';

interface IProps {
    todo: {
        id: number;
        completed: boolean;
        content: string
    };
    onChangeTodoListItemState: (id: number) => void;
    onDeleteTodoListItem: (id: number) => void;
}

export default class Item extends React.Component<IProps, any> {

    constructor(props: IProps) {
        super(props);
        this.onChangeTodoListItemState = this.onChangeTodoListItemState.bind(this);
        this.onDeleteTodoListItem = this.onDeleteTodoListItem.bind(this);
    }

    public onChangeTodoListItemState(){
        this.props.onChangeTodoListItemState(this.props.todo.id);
    }

    public onDeleteTodoListItem(){
        this.props.onDeleteTodoListItem(this.props.todo.id);
    }

    public render() {
        const { todo } = this.props;
        return (
            <div className={todo.completed ? 'todo-item completed' : 'todo-item'}>
                <input type="checkbox" className="toggle" checked={todo.completed} onChange={this.onChangeTodoListItemState} />
                <label>{todo.content}</label>
                <button className="destory" onClick={this.onDeleteTodoListItem} />
            </div>
        );
    }
}