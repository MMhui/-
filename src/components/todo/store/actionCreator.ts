import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

interface ITodo {
    completed: boolean;
    content: string;
    id: number;
}

export const changeValueAction = (value?: string) => ({
    type: actionTypes.CHAGE_INPUT_VALUE,
    value
});

export const addTodoListItemAction = () => ({
    type: actionTypes.ADD_TODO_LIST_ITEM
});

export const deleteTodoListItemAction = (value: number) => ({
    type: actionTypes.DELETE_TODO_LIST_ITEM,
    value
});

export const changeTodoListItemStateAction = (value: number) => ({
    type: actionTypes.CHANGE_TODO_LIST_ITEM_STATE,
    value
});

export const handleTodoListFilterAction = (value: string) => ({
    type: actionTypes.HANDLE_TODO_LIST_FILTER,
    value
});

export const handleTodoListClearAction = () => ({
    type: actionTypes.HANDLE_TODO_LIST_CLEAR
});

export const initTodoListAction = (value: ITodo[]) => ({
    type: actionTypes.INIT_TODO_LIST,
    value
});

export const getInitTodoListAction = () => ({
    type: actionTypes.GET_INIT_TODO_LIST
});

export const initInputValueAction = (value: string) => ({
    type: actionTypes.INIT_INPUT_VALUE,
    value: fromJS(value)
});

export const getInitInputValueAction = () => ({
    type: actionTypes.GET_INIT_INPUT_VALUE
});