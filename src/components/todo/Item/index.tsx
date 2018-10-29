import * as React from 'react';
import { connect } from 'react-redux';
import * as actionCreator from "../store/actionCreator";
import './index.styl';

interface ITodo extends Map<any, any>{
    completed: boolean;
    content: string;
    id: number;
}

interface IProps {
    key: string;
    handleChangeTodoListItemState: (id: number) => void;
    handleDeleteTodoListItem: (id: number) => void;
    todo: ITodo
}

class Item extends React.PureComponent<IProps, ITodo> {

    constructor(props: IProps) {
        super(props);
        this.onChangeTodoListItemState = this.onChangeTodoListItemState.bind(this);
        this.onDeleteTodoListItem = this.onDeleteTodoListItem.bind(this);
    };

    public onChangeTodoListItemState(){
        this.props.handleChangeTodoListItemState(this.props.todo.get('id'));
    }

    public onDeleteTodoListItem(){
        this.props.handleDeleteTodoListItem(this.props.todo.get('id'));
    }

    public render() {
        const { todo } = this.props;
          return (
              <div className={todo.get('completed') ? 'todo-item completed' : 'todo-item'}>
                  <input type="checkbox" className="toggle" checked={todo.get('completed')} onChange={ this.onChangeTodoListItemState } />
                  <label>{todo.get('content')}</label>
                  <button className="destory" onClick={ this.onDeleteTodoListItem } />
              </div>
          );
    }
}

const mapStateToProps = (state: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        handleChangeTodoListItemState(id: number) {
            dispatch(actionCreator.changeTodoListItemStateAction(id));
        },
        handleDeleteTodoListItem(id: number) {
            dispatch(actionCreator.deleteTodoListItemAction(id));
        },
    };
};

const mergeProps = (stateProps: any, dispatchProps: any, ownProps: any) => {
    return Object.assign({}, ownProps, dispatchProps, stateProps)
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Item);