import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';
import rootSaga from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// mount it on the Store
const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware),
        // other store enhancers if any
    )
);

// then run the saga
sagaMiddleware.run(rootSaga);

export default store;