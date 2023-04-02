import React, { useState } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './Login.css';
import axios from 'axios';

interface LoginFormState {
    email: string;
    password: string;
}

const LoginBootStrap: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormState>({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/login', formData);
            // Do something with the response data, e.g. store the user token in state
        } catch (error) {
            setErrorMessage('Invalid email or password');
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
                        {errorMessage && <div className="text-danger mr-2 d-inline-block">{errorMessage}</div>}<br />
                        <Row className="d-flex justify-content-between align-items-center">
                            <Col>
                                <Button variant="primary" type="submit" className="btn-custom-outline">Register</Button>
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

export default LoginBootStrap;
