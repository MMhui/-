import * as React from 'react';
import './index.styl';

interface IProps {
    todo: {
        id: number;
        completed: boolean;
        content: string
    };
    onChange: (id: number) => void;
    onDelete: (id: number) => void;
}

export default class Item extends React.Component<IProps, any> {

    constructor(props: IProps) {
        super(props);
        this.changeText = this.changeText.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    public changeText(){
        this.props.onChange(this.props.todo.id);
    }

    public onDelete(){
        this.props.onDelete(this.props.todo.id);
    }

    public render() {
        const { todo } = this.props;
        return (
            <div className={todo.completed ? 'todo-item completed' : 'todo-item'}>
                <input type="checkbox" className="toggle" checked={todo.completed} onChange={this.changeText} />
                <label>{todo.content}</label>
                <button className="destory" onClick={this.onDelete} />
            </div>
        );
    }
}