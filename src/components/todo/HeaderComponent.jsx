import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthenticationService from '../Auth/AuthenticationService.js';
import { withRouter } from 'react-router';

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return (
            <header>
                <nav className="navbar navbar-dark bg-dark">
                    <div><a href="http://mariobanay.at" className="navbar-brand">My Website</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        );
    }
}

export default withRouter(HeaderComponent);