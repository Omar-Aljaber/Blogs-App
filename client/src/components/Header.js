import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('_id');
        axios.defaults.headers.common = { Authorization: '' };
    }

    render() {
        if (localStorage.getItem('token')) {
            return (
                <div className="navbar">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/create_post">Add Post</Link>
                        </li>
                        <li>
                            <a href="/#logout" onClick={this.logout}>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            );
        }
        return (
            <div className="navbar">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default withRouter(Header);
