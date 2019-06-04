import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import Layout from '@/app/layout';
import { render } from 'react-dom';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

class AppContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
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
