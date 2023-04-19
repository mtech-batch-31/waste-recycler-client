import React, { useState, useEffect } from 'react'
import { Button, Form, Container, Row, Col, Table } from 'react-bootstrap';
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './Price.css';
import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter'; // import the mocking library
import Cookies from 'js-cookie';
import { TABLE_DATA, CATEGORY_DATA } from '../utilities/constants';


interface RecycleRequestItem {
    category: string;
    quantity: number;
    // price: number;
}


interface RecycleFormState {
    category: string;
    quantity: number;
}


// interface LoginFormState {
//     email: string;
//     password: string;
// }

interface ResponseData {
    message: string;
    accessToken: string;
    refreshToken: string;
}

const Price: React.FC = () => {
    const recycleFormData: RecycleFormState = {
        category: '',
        quantity: 0,
    };

    // const initialFormData: LoginFormState = {
    //     email: '',
    //     password: '',
    // };

    const recycleRequestItems: RecycleRequestItem[] = [];
    // const [data, setData] = useState<RecycleRequestItem[]>(recycleRequestItems);
    const [recycleRequest, setRecycleRequest] = useState<RecycleRequestItem[]>(recycleRequestItems);
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

    useEffect(() => {
    }, recycleRequestItems);

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
        console.log("form submit")
        setRecycleRequest([...recycleRequest, {category: formData.category, quantity: formData.quantity}])
        console.log("form submit, recycleRequest: ", recycleRequest);
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
            {/* <div className="mt-5 border">
                <h1 className="text-center">Recycle Cart</h1>
                <h2 className="">Step 1) Get Price Estimate</h2>
            </div> */}
            {/* <Row className="vh-100 justify-content-center align-items-center"> */}
            <div>

                <div className="mt-5  col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">

                    <div className=" ">
                        <h1 className="text-center p-3">Recycle Cart</h1>
                        <h2 className="text-center">Step 1) Get Price Estimate</h2>
                    </div>
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
                        {recycleRequest.map((item, index)=>
                            <>
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{item.category}</td>
                                    <td>{item.quantity}</td>
                                    <td>kg</td>
                                    <td></td>
                                </tr>
                            </>)
                        }
                        {/* <tr>
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
                        </tr> */}
                        
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
                        <Row>


                        <Col>
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
                                { CATEGORY_DATA.map(c => <option key={c.category} value={c.category}>{c.category}</option >) }
                                </Form.Control>
                            </Form.Group>
                        </Col>



                        {/* <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option>Recycling Category</option>
                                { CATEGORY.map(c => <option value={c.category}>{c.category}</option >) }
                            </Form.Select>
                        </Form.Group> */}

                        <Col>
                            <Form.Group controlId="quantity">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="E.g. 1 kg"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleInputChange}
                                    // required
                                />
                            </Form.Group>
                        </Col>
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
                        {/* <Button>Add</Button> */}
                        <Col xs="auto" className='d-flex align-items-end justify-content-end'>
                            <Button variant="primary" type="submit" >Add</Button>
                        </Col>


                        {/* <Row className="d-flex justify-content-between align-items-center">
                            <Col>
                                <Link to="/register"><Button variant="primary" className="btn-custom-outline">Register</Button></Link>
                            </Col>
                            <Col className="d-flex justify-content-end">
                                <Button variant="primary" type="submit" className="btn-custom">Login</Button>
                            </Col>
                        </Row> */}
                        </Row>
                        {responseData && <div className="text-success mr-2 d-inline-block">{responseData.message}</div>}
                        {errorMessage && <div className="text-danger mr-2 d-inline-block">{errorMessage}</div>}<br />
                    </Form>
                </div>
            {/* </Row> */}
                            
            </div>
        </Container>
    );
};

export default Price;
