import * as actionTypes from './actionTypes';

interface ITodo {
    completed: boolean;
    content: string;
    id: number;
}

interface IState {
    filterName: string;
    left: number;
    todoList: ITodo[];
    inputValue: string;
    tabs: string[]
}

interface IAction {
    type: string;
    value?: any;
}

const defaultState = {
    filterName: 'all',
    inputValue: '',
    left: 0,
    tabs: ['all', 'active', 'completed'],
    todoList: [],
};

function calcLeft(filter: string, todoList: ITodo[]) {
    return todoList.filter((todo: ITodo) => {
        if (filter === 'active') {
            return todo.completed === false;
        } else if (filter === 'completed') {
            return todo.completed === true;
        } else {
            return true;
        }
    }).length
}

// reducer可以接受state，但是不能修改state
export default (state: IState = defaultState, action: IAction) => {
    switch (action.type) {
        case actionTypes.INIT_INPUT_VALUE:
            state = JSON.parse(JSON.stringify(state));
            state.inputValue = action.value;
            return state;
        case actionTypes.INIT_TODO_LIST:
            state = JSON.parse(JSON.stringify(state));
            state.todoList = action.value;
            state.left = calcLeft(state.filterName, state.todoList);
            return state;
        case actionTypes.CHAGE_INPUT_VALUE:
            state = JSON.parse(JSON.stringify(state));
            state.inputValue = action.value;
            return state;
        case actionTypes.ADD_TODO_LIST_ITEM:
            state = JSON.parse(JSON.stringify(state));
            state.todoList.push({
                completed: false,
                content: state.inputValue,
                id: parseInt(String(Math.random() * 1000), 10)
            });
            state.inputValue = '';
            state.left = calcLeft(state.filterName, state.todoList);
            return state;
        case actionTypes.DELETE_TODO_LIST_ITEM:
            state = JSON.parse(JSON.stringify(state));
            state.todoList = state.todoList.filter((todo: ITodo) => {
                return todo.id !== action.value;
            });
            state.left = calcLeft(state.filterName, state.todoList);
            return state;
        case actionTypes.CHANGE_TODO_LIST_ITEM_STATE:
            state = JSON.parse(JSON.stringify(state));
            state.todoList.map((todo: ITodo) => {
                if (todo.id === action.value) {
                    todo.completed = !todo.completed;
                }
                return todo;
            });
            state.left = calcLeft(state.filterName, state.todoList);
            return state;
        case actionTypes.HANDLE_TODO_LIST_FILTER:
            state = JSON.parse(JSON.stringify(state));
            state.filterName = action.value;
            state.left = calcLeft(state.filterName, state.todoList);
            return state;
        case actionTypes.HANDLE_TODO_LIST_CLEAR:
            state = JSON.parse(JSON.stringify(state));
            state.todoList = state.todoList.filter((todo: ITodo) => {
                return todo.completed !== true;
            });
            state.left = calcLeft(state.filterName, state.todoList);
            return state;
        default:
            return state;
    }
};