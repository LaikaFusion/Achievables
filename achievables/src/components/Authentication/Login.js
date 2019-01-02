import React, { Component } from 'react';
import axios from 'axios';
// const url = process.env.REACT_APP_API_URL;

const initialUser = {
    email: '',
    password: ''
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { ...initialUser },
            message: ''
        }
    }

    inputHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ user: { ...this.state.user, [name]: value }});
    }

    submitHandler = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:3333/api/users/login`, this.state.user)
            .then(response => {
                if (response.status === 200 && response.data) {
                    localStorage.setItem('secret_token', response.data.token);
                    this.props.history.push('/');
                } else {
                    throw new Error();
                }
            })
            .catch(() => {
                this.setState({
                    message: 'Authentication failed',
                    user: { ...initialUser }
                })
            })
    }

    render() {
        return (
            <section>
                <form onSubmit={this.submitHandler}>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='text'
                        id='email'
                        name='email'
                        value={this.state.user.email}
                        onChange={this.inputHandler}
                    />

                    <label htmlFor='password'>Password</label>
                    <input
                        type='text'
                        id='password'
                        name='password'
                        value={this.state.user.password}
                        onChange={this.inputHandler}
                    />
                    <button type="submit">Login</button>
                </form>
                {this.state.message ? (<h4>{this.state.message}</h4>) : undefined}
            </section>
        );
    }
}

export default Login;