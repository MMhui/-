import * as actionTypes from './actionTypes';
import { fromJS, Map, List } from 'immutable';

interface ITodo extends Map<string, any>{
    completed: boolean;
    content: string;
    id: number;
}

interface IState extends Map<string, any>{
    filterName: string;
    left: number;
    todoList: List<ITodo>;
    inputValue: string;
    tabs: List<string>
}

interface IAction {
    type: string;
    value?: any;
}

const defaultState = fromJS({
    filterName: 'all',
    inputValue: 'ss',
    left: 0,
    tabs: ['all', 'active', 'completed'],
    todoList: [],
});

function calcLeft(filterName: string, todoList: List<ITodo>) {
    return todoList.filter((todo: ITodo) => {
        if (filterName === 'active') {
            return todo.get('completed') === false;
        } else if (filterName === 'completed') {
            return todo.get('completed') === true;
        } else {
            return true;
        }
    }).size;
}

// reducer可以接受state，但是不能修改state
export default (state: IState = defaultState, action: IAction) => {
    switch (action.type) {
        case actionTypes.INIT_INPUT_VALUE:
            return state.set('inputValue', action.value);
        case actionTypes.INIT_TODO_LIST:
            return state.withMutations((newState: IState) => newState.set('todoList', fromJS(action.value)).set('left', calcLeft(newState.get('filterName'), newState.get('todoList'))));
        case actionTypes.CHAGE_INPUT_VALUE:
            return state.set('inputValue', action.value);
        case actionTypes.ADD_TODO_LIST_ITEM:
            return state.withMutations((newState: IState) => newState.set('todoList', newState.get('todoList').push(fromJS({
                completed: false,
                content: newState.get('inputValue'),
                id: parseInt(String(Math.random() * 1000), 10)
            })))
                .set('inputValue', '')
                .set('left', calcLeft(newState.get('filterName'), newState.get('todoList'))));
        case actionTypes.DELETE_TODO_LIST_ITEM:
            return state.withMutations((newState: IState) => newState.set('todoList', newState.get('todoList').filter((todo: ITodo) => {
                    return todo.get('id') !== action.value;
                }))
                .set('left', calcLeft(newState.get('filterName'), newState.get('todoList'))));
        case actionTypes.CHANGE_TODO_LIST_ITEM_STATE:
            return state.withMutations((newState: IState) => newState.set('todoList', newState.get('todoList').map((todo: ITodo) => {
                if (todo.get('id') === action.value) {
                    return todo.set('completed', !todo.get('completed'));
                }
                return todo;
            }))
                .set('left', calcLeft(newState.get('filterName'), newState.get('todoList'))));
        case actionTypes.HANDLE_TODO_LIST_FILTER:
            return state.withMutations((newState: IState) => newState.set('filterName', action.value)
                .set('left', calcLeft(newState.get('filterName'), newState.get('todoList'))));
        case actionTypes.HANDLE_TODO_LIST_CLEAR:
            return state.withMutations((newState: IState) => newState.set('todoList', newState.get('todoList').filter((todo: ITodo) => {
                return todo.get('completed') !== true;
            }))
                .set('left', calcLeft(newState.get('filterName'), newState.get('todoList'))));
        default:
            return state;
    }
};