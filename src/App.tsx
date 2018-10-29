import * as React from 'react';
import './App.styl';
import Footer from './components/todo/Footer';
import Header from './components/todo/Header';
import Todo from './components/todo/Main';
import {Provider} from 'react-redux';
import store from './components/todo/store';

class App extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <div id="app">
                    <div id="cover"/>
                    <Header title="Todo List"/>
                    <Todo/>
                    <Footer name="MMhui"/>
                </div>
            </Provider>
        );
    }
}

export default App;
