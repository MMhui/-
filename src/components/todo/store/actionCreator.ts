import * as actionTypes from './actionTypes';

// interface ITodo {
//     completed: boolean;
//     content: string;
//     id: number;
// }

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