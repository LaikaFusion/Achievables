import React, { Component } from 'react';
import axios from 'axios';
// const url = process.env.REACT_APP_API_URL;

const initialUser = {
    name: '',
    email: '',
    password: ''
}

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { ...initialUser },
            message: ''
        }
    }

    inputHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ user: { ...this.state.user, [name]: value } });
    }

    submitHandler = (event) => {
        event.preventDefault();
        axios
            .post(`http://localhost:3333/api/users/register`, this.state.user)
            .then(response => {
                if (response.status === 201) {
                    this.setState({
                        message: 'Registration successful',
                        user: { ...initialUser }
                    })
                } else {
                    throw new Error();
                }
            })
            .catch(error => {
                this.setState({
                    message: 'Registration failed',
                    user: { ...initialUser }
                })
            })
    }

    render() {
        return (
            <section>
                <form onSubmit={this.submitHandler}>
                    <label htmlFor='name'>name</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={this.state.user.name}
                        onChange={this.inputHandler}
                    />

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

                    <button type="submit">Register</button>
                </form>
                {this.state.message ? (<h4>{this.state.message}</h4>) : undefined}
            </section>
        );
    }
}

export default Register;