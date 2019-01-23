import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import { render } from 'react-dom';
import './index.css';

class AppContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}


render(<AppContainer />, document.getElementById('root'));
