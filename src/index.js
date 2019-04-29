import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import App from './App';
import { render } from 'react-dom';

class AppContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <App />
        </Router>
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="top-left"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick
        />
      </Provider>
    );
  }
}

render(<AppContainer />, document.getElementById('root'));
