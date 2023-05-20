import React, { useState, useEffect } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './Login.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_PATH } from '../utilities/constants';
import {ACCESS_TOKEN} from '../utilities/constants'

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
    const [responseData, setResponseData] = useState<ResponseData | null>(null); // eslint-disable-line no-unused-vars
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // eslint-disable-line no-unused-vars
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get(ACCESS_TOKEN);
        if (token) {
            axios
                .get(process.env.REACT_APP_RECYCLE_API_URL+API_PATH.LOGIN, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => setIsLoggedIn(true))
                .catch(() => Cookies.remove(ACCESS_TOKEN));
        }
    }, []);

    const removeToken = () => {
        Cookies.remove(ACCESS_TOKEN);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setResponseData(null);
        setErrorMessage('');
        try {
            const response = await axios.post(process.env.REACT_APP_RECYCLE_API_URL+API_PATH.LOGIN, {
                email: formData.email,
                password: formData.password
            }, {
                withCredentials: true,
            });
            console.log('login response1', response);
            if (response.data.accessToken == null) {
                setErrorMessage('Wrong password. Try again or contact us to reset it.');
            } else{
            const token = response.data.accessToken;
            Cookies.set(ACCESS_TOKEN, token, {path:'/'});
            setResponseData(response.data);
            setIsLoggedIn(true);
            navigate("/home");
        }

        } catch (error) {
            setErrorMessage('Couldn\'t find your account');
            removeToken();
        }
    };

    return (
        <Container fluid>
            <Row className="vh-100 justify-content-center align-items-center">
                <div className="col-xl-5 col-lg-5 col-md-6 col-sm-7 col-xs-8 col-8">
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
                        {errorMessage && <div className="text-danger mr-2 d-inline-block">{errorMessage}</div>}<br/>
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
