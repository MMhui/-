import * as React from 'react';
import './App.styl';
import Footer from './components/todo/Footer';
import Header from './components/todo/Header';
import Todo from './components/todo/Main';

class App extends React.Component {
  public render() {
    return (
      <div id="app">
          <div id="cover" />
          <Header title="Todo List" />
          <Todo />
          <Footer name="MMhui" />
      </div>
    );
  }
}

export default App;
