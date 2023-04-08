import React, { useState, useEffect } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './Login.css';
import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter'; // import the mocking library
import Cookies from 'js-cookie';

interface LoginFormState {
    email: string;
    password: string;
}

interface ResponseData {
    message: string;
    accessToken: string;
    refreshToken: string;
}

const Login: React.FC = () => {
    const initialFormData: LoginFormState = {
        email: '',
        password: '',
    };

    const [formData, setFormData] = useState<LoginFormState>(initialFormData);
    const [responseData, setResponseData] = useState<ResponseData | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const token = Cookies.get('accessToken');
        if (token) {
            axios
                .get('http://localhost:8080/api/v1/auth/check-token', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => setIsLoggedIn(true))
                .catch(() => Cookies.remove('accessToken'));
        }
    }, []);

    const removeToken = () => {
        Cookies.remove('access_token');
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Clear the responseData and errorMessage
        setResponseData(null);
        setErrorMessage('');

        // Create a new instance of the mocking library and set it up to intercept the axios.post call
        // const mock = new MockAdapter(axios);
        // mock.onPost('http://localhost:8080/api/v1/auth/login').reply(200, {
        //     returnCode: '00',
        //     message: 'The request has been successfully processed',
        //     accessToken:
        //         'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzY2dsd3NqQDE2My5jb20iLCJpYXQiOjE2ODA2NzM0MzAsImV4cCI6MTY4MDY3NDMzMH0.sCts66QMeHgsk2daV2qUfCy4bZee625QY73jGsy7uQLo0orNo6W7BP2gijFHHBrg',
        //     refreshToken: 'd7c039c1-2bd2-476b-a2fe-da0367d4c94f',
        // });

        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
                email: formData.email, // Use the email value for the userName parameter
                password: formData.password
            }, {
                withCredentials: true, // Add the withCredentials flag
            });

            // Retrieve the token from the response
            const token = response.data.accessToken;
            Cookies.set('access_token', token);
            setResponseData(response.data);
        } catch (error) {
            setErrorMessage('Invalid email or password');
            removeToken();
        }
    };

    return (
        <Container fluid>
            <Row className="vh-100 justify-content-center align-items-center">
                <div className="col-3 mx-auto">
                    <Form onSubmit={handleFormSubmit}>
                        <h1 className="custom-color">Login to Recycler</h1>
                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        {responseData && <div className="text-success mr-2 d-inline-block">{responseData.message}</div>}
                        {errorMessage && <div className="text-danger mr-2 d-inline-block">{errorMessage}</div>}<br />
                        <Row className="d-flex justify-content-between align-items-center">
                            <Col>
                                <Link to="/register"><Button variant="primary" className="btn-custom-outline">Register</Button></Link>
                            </Col>
                            <Col className="d-flex justify-content-end">
                                <Button variant="primary" type="submit" className="btn-custom">Login</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Row>
        </Container>
    );
};

export default Login;
