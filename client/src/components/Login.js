import React from 'react';
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.errorRender = this.errorRender.bind(this);
        this.state = {
            name: '',
            email: '',
            password: '',
            error: '',
        };
    }

    changeEmail(e) {
        this.setState({
            email: e.target.value,
            error: '',
        });
    }
    changePassword(e) {
        this.setState({
            password: e.target.value,
            error: '',
        });
    }
    onSubmit(e) {
        e.preventDefault();
        if (!this.state.email) {
            return this.setState({
                error: 'Attention: You should fill the Email field!',
            });
        }
        if (!this.state.password) {
            return this.setState({
                error: 'Attention: You should fill the password field!',
            });
        }
        const data = {
            email: this.state.email,
            password: this.state.password,
        };
        axios
            .post('/api/login', data)
            .then((res) => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('_id', res.data._id);
                axios.defaults.headers.common = {
                    Authorization: res.data.token,
                };
                this.props.history.push('/');
            })
            .catch((err) => {
                this.setState({
                    error: err.response.data.message,
                });
            });
    }

    errorRender() {
        if (this.state.error) {
            return <blockquote>{this.state.error}</blockquote>;
        }
    }

    render() {
        return (
            <div>
                <h2 className="register">Login</h2>
                {this.errorRender()}
                <form onSubmit={this.onSubmit}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={this.state.email}
                        onChange={this.changeEmail}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={this.changePassword}
                    />
                    <input type="submit" value="Login" />
                </form>
            </div>
        );
    }
}

export default Login;
