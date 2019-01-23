import React, { PureComponent } from 'react';

class Navbar extends PureComponent {
  render() {
    return(
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          {/* eslint-disable-next-line */}
          <a className="navbar-item">
            <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: Free, open source, & modern CSS framework based on Flexbox" width="112" height="28" />
          </a>  
          {/* eslint-disable-next-line */}
          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
         </div>
      </nav>
    )
  }
}

export default Navbar;
