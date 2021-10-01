import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import CreatePost from './components/CreatePost';
import ViewPost from './components/ViewPost';
import EditPost from './components/EditPost';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem('token');
        axios.defaults.headers.common = { Authorization: token };
    }
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Route path="/create_post" component={CreatePost} />
                            <Route path="/view_post/:id" component={ViewPost} />
                            <Route path="/edit_post/:id" component={EditPost} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
