import React, { useState, useEffect } from 'react'
import { Button, Form, Container, Row, Col, Table } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './Price.css';
import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter'; // import the mocking library
import Cookies from 'js-cookie';
import { TABLE_DATA, CATEGORY_DATA, API_PATH } from '../utilities/constants';


interface RecyclePriceResponse {
    returnCode: string,
    message: string
    totalPrice: number,
    items: RecyclePriceResponseItem[]
}


interface RecyclePriceResponseItem {
    name: string;
    quantity: number;
    unitPrice: number;
    subTotalPrice: number;
}

interface RecycleRequestItem {
    category: string;
    quantity: number;
    description: string;
}


interface RecycleFormState {
    category: string;
    quantity: number;
    unitOfMeasurement: string;
    description: string;
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

const getUnitOfMeasurement = (category: string) =>{
    console.log("getUnitOfMeasurement for category:", category)
    try{
        return CATEGORY_DATA.filter(c => c.name == category)[0].unitOfMeasurement;
    } catch (error) {
        console.error(error);
    }
    return "";
}

const Price: React.FC = () => {

    const navigate = useNavigate();
    const recycleFormData: RecycleFormState = {
        category: '',
        quantity: 0,
        unitOfMeasurement: 'unit',
        description: ''
    };
    const recyclePriceResp: RecyclePriceResponse = {
        returnCode: "",
        message: "",
        totalPrice: 0,
        items: []
    }
    // const initialFormData: LoginFormState = {
    //     email: '',
    //     password: '',
    // };

    const recycleRequestItems: RecycleRequestItem[] = [];
    // const [data, setData] = useState<RecycleRequestItem[]>(recycleRequestItems);
    const [recycleRequest, setRecycleRequest] = useState<RecycleRequestItem[]>(recycleRequestItems);

    const [recyclePriceResponse, setRecyclePriceResponse] = useState<RecyclePriceResponse>(recyclePriceResp);
    const [formData, setFormData] = useState<RecycleFormState>(recycleFormData);
    // const [formData, setFormData] = useState<LoginFormState>(initialFormData);
    const [responseData, setResponseData] = useState<ResponseData | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const token = Cookies.get('access_token');
        if (token) {
            axios
                .get('http://localhost:8080/api/v1/auth/test', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => setIsLoggedIn(true))
                .catch(() => Cookies.remove('access_token'));
        } else {
            console.log("token not found from Cookie");
            navigate("/");
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

        if(name=='category'){
            console.log('changing category')
            setFormData({ ...formData, [name]: value, 'unitOfMeasurement': getUnitOfMeasurement(value) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        console.log("handleInputChange called - formData", formData);
        
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("form submit, formData", formData)


        if (formData.category=='' || formData.quantity <= 0) {
            console.error("invalid form input");
            return;
        }
        const newRecycleRequest = [...recycleRequest, {category: formData.category, quantity: formData.quantity, description: formData.description}];
        setRecycleRequest(newRecycleRequest);
        console.log("form submit, recycleRequest: ", recycleRequest);
        // Clear the responseData and errorMessage
        // setResponseData(null);
        // setErrorMessage('');

        // Create a new instance of the mocking library and set it up to intercept the axios.post call
        // const mock = new MockAdapter(axios);
        // mock.onPost('http://localhost:8080/api/v1/auth/login').reply(200, {
        //     returnCode: '00',
        //     message: 'The request has been successfully processed',
        //     accessToken:
        //         'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzY2dsd3NqQDE2My5jb20iLCJpYXQiOjE2ODA2NzM0MzAsImV4cCI6MTY4MDY3NDMzMH0.sCts66QMeHgsk2daV2qUfCy4bZee625QY73jGsy7uQLo0orNo6W7BP2gijFHHBrg',
        //     refreshToken: 'd7c039c1-2bd2-476b-a2fe-da0367d4c94f',
        // });
        const token = Cookies.get('access_token');
        if (token) {
            console.log('token found from Cookies', token);
            // axios
            //     .get('http://localhost:8080/api/v1/auth/check-token', {
            //         headers: { Authorization: `Bearer ${token}` },
            //     })
            //     .then(() => setIsLoggedIn(true))
            //     .catch(() => Cookies.remove('accessToken'));
        } else {
            console.log('token not found')
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*'
          };
        const payload = {
            data: newRecycleRequest,
        };
        console.log("headers", headers);
        console.log("payload", payload);
        try {
            const response = await axios.post(process.env.REACT_APP_RECYCLE_API_URL + API_PATH.PRICE,  payload , {headers: headers});
            console.log("price response", response);
            setRecyclePriceResponse(response.data);
        //     // Retrieve the token from the response
        //     const token = response.data.accessToken;
        //     Cookies.set('access_token', token);
        //     setResponseData(response.data);
        } catch (error) {
            console.log("error when calling price api",error);
        }
    };

    return (
        <Container fluid className="pt-5">
            <div>

                <div className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">

                    <div className=" ">
                        <h1 className="text-center p-3">Recycle Cart</h1>
                        <h2 className="text-center">Step 1) Get Price Estimate</h2>
                    </div>
                    <Table bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Description</th>
                        <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recycleRequest.map((item, index)=>
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.category}</td>
                                    <td>{item.quantity}</td>
                                    <td>{getUnitOfMeasurement(item.category)}</td>
                                    <td>{item.description}</td>
                                    <td>${recyclePriceResponse && recyclePriceResponse.items && recyclePriceResponse.items[index] && recyclePriceResponse.items[index].subTotalPrice }</td>
                                </tr>
                            )
                        }
                    
                        <tr>
                            <td colSpan={5}>Total</td>
                            <td>${recyclePriceResponse && recyclePriceResponse.totalPrice}</td>
                        </tr>
                    </tbody>
                    </Table>

                    <Form className="pt-3" onSubmit={handleFormSubmit}>
                        <h1 className="custom-color text-center">Add Item</h1>
                        <Row>


                        <Col >
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
                                { CATEGORY_DATA.map(c => <option key={c.name} value={c.name}>{c.name}</option >) }
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

                        <Col xs={2}>
                            <Form.Group controlId="quantity">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    // placeholder="E.g. 1 kg"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleInputChange}
                                    min="0"
                                    step=".01"
                                    // required
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={1} className="d-flex align-items-end">
                            <span>{formData.unitOfMeasurement}</span>
                        </Col>
                        <Col >
                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="e.g. 10 plastic bottles"
                                    name="description"
                                    value={formData.description}
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
                        <Col  xs={2}  className='d-flex align-items-end justify-content-end'>
                            <Button className="button" variant="primary" type="submit" >Add</Button>
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
