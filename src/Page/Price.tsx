import React, { useState, useEffect } from 'react'
import { Button, Form, Container, Row, Col, Table } from 'react-bootstrap';
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './Price.css';
import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter'; // import the mocking library
import Cookies from 'js-cookie';
import { TABLE_DATA, CATEGORY } from '../utilities/constants';


interface RecycleFormState {
    category: string;
    quantity: string;
}


interface LoginFormState {
    email: string;
    password: string;
}

interface ResponseData {
    message: string;
    accessToken: string;
    refreshToken: string;
}

const Price: React.FC = () => {
    const recycleFormData: RecycleFormState = {
        category: '',
        quantity: '',
    };

    const initialFormData: LoginFormState = {
        email: '',
        password: '',
    };

    const [formData, setFormData] = useState<RecycleFormState>(recycleFormData);
    // const [formData, setFormData] = useState<LoginFormState>(initialFormData);
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
        console.log("handleInputChange called - event:", event);
        const { name, value } = event.target;
        console.log("handleInputChange called - name: ", name, ", value: ", value);
        setFormData({ ...formData, [name]: value });
        console.log("handleInputChange called - formData", formData);
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

        // try {
        //     const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
        //         email: formData.email, // Use the email value for the userName parameter
        //         password: formData.password
        //     }, {
        //         withCredentials: true, // Add the withCredentials flag
        //     });

        //     // Retrieve the token from the response
        //     const token = response.data.accessToken;
        //     Cookies.set('access_token', token);
        //     setResponseData(response.data);
        // } catch (error) {
        //     setErrorMessage('Invalid email or password');
        //     removeToken();
        // }
    };

    return (
        <Container fluid className="border">
            <div className="mt-5 border">
                <h1 className="text-center">Recycle Cart</h1>
            </div>
            {/* <Row className="vh-100 justify-content-center align-items-center"> */}
            <div>

                <div className=" border col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Paper</td>
                            <td>1</td>
                            <td>kg</td>
                            <td>$3.80</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Metal</td>
                            <td>1</td>
                            <td>kg</td>
                            <td>$3.80</td>
                        </tr>
                        <tr>
                        {/* <td></td> */}
                        <td colSpan={4}>Total</td>
                        {/* <td>@twitter</td> */}
                        <td>$1.25</td>
                        </tr>
                    </tbody>
                    </Table>

                    <Form onSubmit={handleFormSubmit}>
                        <h1 className="custom-color text-center">Add Item</h1>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                name="category"
                                as="select"
                                // value={selectedOption}
                                value={formData.category}
                                onChange={handleInputChange}
                            >
                            <option value="">Select an option</option>
                            { CATEGORY.map(c => <option value={c.category}>{c.category}</option >) }
                            </Form.Control>
                        </Form.Group>


                        {/* <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option>Recycling Category</option>
                                { CATEGORY.map(c => <option value={c.category}>{c.category}</option >) }
                            </Form.Select>
                        </Form.Group> */}
                        <Form.Group controlId="quantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                // type="password"
                                placeholder="E.g. 1 kg"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        {/* <Form.Group controlId="email">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="E.g. Plastic"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group> */}
                        {/* <Form.Group controlId="password">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                // type="password"
                                placeholder="E.g. 1 kg"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group> */}
                        <Button>Add</Button>
                        {responseData && <div className="text-success mr-2 d-inline-block">{responseData.message}</div>}
                        {errorMessage && <div className="text-danger mr-2 d-inline-block">{errorMessage}</div>}<br />
                        {/* <Row className="d-flex justify-content-between align-items-center">
                            <Col>
                                <Link to="/register"><Button variant="primary" className="btn-custom-outline">Register</Button></Link>
                            </Col>
                            <Col className="d-flex justify-content-end">
                                <Button variant="primary" type="submit" className="btn-custom">Login</Button>
                            </Col>
                        </Row> */}
                    </Form>
                </div>
            {/* </Row> */}
                            
            </div>
        </Container>
    );
};

export default Price;
