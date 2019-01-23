import React, { Fragment }  from 'react';
import Navbar from './layout/Navbar';
import Content from './layout/Content';

const Layout = () => {
  return (
    <Fragment>
      <Navbar/>
      <Content />    
    </Fragment>
  );
}

export default Layout;
