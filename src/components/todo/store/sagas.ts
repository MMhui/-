import { takeEvery, all, call, put } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actionCreator from './actionCreator';
import axios from 'axios';

function* getInitTodoList() {
    try {
        const res = yield axios.get('/list.json');
        const action = actionCreator.initTodoListAction(res.data);
        yield put(action);
    } catch (e) {
        console.log(e);
    }
}

function* getInitTodoListSaga() {
    yield takeEvery(actionTypes.GET_INIT_TODO_LIST, getInitTodoList);
}

function* getInitInputValue() {
    try{
        const res = yield axios.get('/initInputValue.json');
        const action = actionCreator.initInputValueAction(res.data.value);
        yield put(action);
    } catch (e) {
        console.log(e);
    }
}

function* getInitInputValueSaga() {
    yield takeEvery(actionTypes.GET_INIT_INPUT_VALUE, getInitInputValue);
}

function* rootSaga() {
    yield all([
        call(getInitInputValueSaga),
        call(getInitTodoListSaga)
    ])
}

export default rootSaga;