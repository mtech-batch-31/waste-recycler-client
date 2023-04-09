import { useState } from "react";
import {Link} from "react-router-dom"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min"
import { Button, Form, Container, Row, Col, Alert} from 'react-bootstrap';
import axios from 'axios';

interface RegisterAccountState 
{
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    contactNumber: string;
    street: string;
    blockNo: string;
    floorNo: string;
    unitNo: string;
    postalCode: string;
}
interface RegisterResult
{
    isSuccess: boolean;
    message: string;
}
const RegisterAccount = () => {
    const initFormState: RegisterAccountState = {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        contactNumber: '',
        street: '',
        blockNo: '',
        floorNo: '',
        unitNo: '',
        postalCode: ''
    };
    const [formData, setFormData] = useState<RegisterAccountState>(initFormState);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
    const [isFirstNameValid, setIsFirstNameValid] = useState(true);
    const [isLastNameValid, setIsLastNameValid] = useState(true);
    const [isContactValid, setIsContactValid] = useState(true);
    const [isStreetValid, setIsStreetValid] = useState(true);
    const [isBlockValid, setIsBlockValid] = useState(true);
    const [isPostCodeValid, setIsPostCodeValid] = useState(true);
    const [isUnitNoValid, setIsUnitNoValid] = useState(true);
    const [isFloorNoValid, setIsFloorNoValid] = useState(true);
    const [registerResult, setRegisterResult] = useState<RegisterResult>({isSuccess: false, message: ""});

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value.trim() });
    }
    const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
        switch(event.target.id )
        {
            case 'email':
                setIsEmailValid(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email));
                break;
            case 'password':
                setIsPasswordValid(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(formData.password));
                break;
            case 'confirmPassword':
                setIsConfirmPasswordValid(formData.password === formData.confirmPassword);
                break;
            case 'contactNumber':
                setIsContactValid(/^([0-9]){8}$/.test(formData.contactNumber));
                break;
            case 'firstName':
                setIsFirstNameValid(formData.firstName.length > 0);
                break;
            case 'lastName':
                setIsLastNameValid(formData.lastName.length > 0);
                break;
            case 'street':
                setIsStreetValid(formData.street.length > 0);
                break;
            case 'blockNo':
                setIsBlockValid(formData.blockNo.length > 0);
                break;
            case 'postalCode':
                setIsPostCodeValid(/^([0-9]){6}$/.test(formData.postalCode));
                break;
            case 'floorNo':
                setIsFloorNoValid(/^([0-9]){1,2}$/.test(formData.floorNo));
                break;
            case 'unitNo':
                setIsUnitNoValid(/^([0-9]){1,4}$/.test(formData.unitNo));
                break;
        }
    }
    const submitRegistration = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        //validate form data when submit
        setIsEmailValid(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email));
        setIsPasswordValid(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(formData.password));
        setIsConfirmPasswordValid(formData.password === formData.confirmPassword);
        setIsContactValid(/^([0-9]){8}$/.test(formData.contactNumber));
        setIsFirstNameValid(formData.firstName.length > 0);
        setIsLastNameValid(formData.lastName.length > 0);
        setIsStreetValid(formData.street.length > 0);
        setIsBlockValid(formData.blockNo.length > 0);
        setIsPostCodeValid(/^([0-9]){6}$/.test(formData.postalCode));
        setIsFloorNoValid(/^([0-9]){1,2}$/.test(formData.floorNo));
        setIsUnitNoValid(/^([0-9]){1,4}$/.test(formData.unitNo));
        
        //is form is valid
        if(isEmailValid && isPasswordValid && isConfirmPasswordValid && isContactValid && isFirstNameValid && isLastNameValid && isStreetValid 
            && isBlockValid && isPostCodeValid && isFloorNoValid && isUnitNoValid)
        {
            try {
                console.log('calling register API');
                const response = await axios.post('http://localhost:8080/api/v1/user/register', {
                    email: formData.email, 
                    password: formData.password,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    contactNumber: formData.blockNo,
                    address: `Blk ${formData.blockNo}, ${formData.street}, #${formData.floorNo}-{${formData.unitNo}}`,
                    postalCode: formData.postalCode
                });
                if(response.status != 200) //register unsuccess
                {
                    setRegisterResult({isSuccess: false, message: "Error when registering. Please try again."});
                    console.log(response);
                }
                else
                {
                    setRegisterResult({isSuccess: true, message: "Your account has been successfully registered."});
                }
                
            } catch (error) 
            {
                setRegisterResult({isSuccess: false, message: "Error when registering. Please try again."});
                console.log("Error when calling API.")
                console.log(error);
            }
        }
        else
        {
            console.log('form is invalid');
            setRegisterResult({isSuccess: false, message: ""});
        }
    }
    return (
    <Container>
        <Row className="vh-100 justify-content-center align-items-center">
        <div className="col-8 mx-auto">
        <Form onSubmit={submitRegistration}>
            <h1 className="custom-color">Register Account</h1>
            <Row>
            <Form.Group controlId="email" >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" onChange={onChangeHandler} isInvalid={!isEmailValid} onBlur={onBlurHandler}/>
                <Form.Control.Feedback type="invalid">Please enter valid email.</Form.Control.Feedback>
            </Form.Group>
            </Row>
            <Row><Form.Group controlId="password" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={onChangeHandler} isInvalid={!isPasswordValid} onBlur={onBlurHandler}/>
                <Form.Control.Feedback type="invalid">Password must be at least 8 characters, is alphanumeric and contain special character.</Form.Control.Feedback>
            </Form.Group></Row>
            <Row><Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" onChange={onChangeHandler} isInvalid={!isConfirmPasswordValid} onBlur={onBlurHandler}/>
                <Form.Control.Feedback type="invalid">Confirm password and password does not match.</Form.Control.Feedback>
            </Form.Group></Row>
            <Row>
                <Col><Form.Group controlId="firstName">
                    <Form.Label >First Name</Form.Label>
                    <Form.Control type="text" onChange={onChangeHandler} isInvalid={!isFirstNameValid} onBlur={onBlurHandler}/>
                    <Form.Control.Feedback type="invalid">Please enter first name.</Form.Control.Feedback>
                </Form.Group></Col>
                <Col><Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" onChange={onChangeHandler} isInvalid={!isLastNameValid} onBlur={onBlurHandler}/>
                    <Form.Control.Feedback type="invalid">Please enter last name.</Form.Control.Feedback>
                </Form.Group></Col>
            </Row>
            <Form.Group controlId="contactNumber">
                <Form.Label>Contact</Form.Label>
                <Form.Control type="text" onChange={onChangeHandler} isInvalid={!isContactValid} onBlur={onBlurHandler}/>
                <Form.Control.Feedback type="invalid">Please enter valid contact number.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="street">
                <Form.Label>Street Name</Form.Label>
                <Form.Control type="text" onChange={onChangeHandler} isInvalid={!isStreetValid} onBlur={onBlurHandler}/>
                <Form.Control.Feedback type="invalid">Please enter street.</Form.Control.Feedback>
            </Form.Group>
            <Row>
            <Form.Group as={Col} controlId="blockNo">
                <Form.Label>Blk No.</Form.Label>
                <Form.Control type="text" onChange={onChangeHandler} isInvalid={!isBlockValid} onBlur={onBlurHandler}/>
                <Form.Control.Feedback type="invalid">Please enter block no.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="floorNo">
                <Form.Label>Floor No.</Form.Label>
                <Form.Control type="text" maxLength={2} onChange={onChangeHandler} isInvalid={!isFloorNoValid} onBlur={onBlurHandler}/>
                <Form.Control.Feedback type="invalid">Please valid floor no.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="unitNo">
                <Form.Label>Unit No.</Form.Label>
                <Form.Control type="text" maxLength={4} onChange={onChangeHandler} isInvalid={!isUnitNoValid} onBlur={onBlurHandler}/>
                <Form.Control.Feedback type="invalid">Please valid unit no.</Form.Control.Feedback>
            </Form.Group>
            </Row>
            <Row>
            <Form.Group as={Col} controlId="postalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type="text" onChange={onChangeHandler} isInvalid={!isPostCodeValid} onBlur={onBlurHandler}/>
                <Form.Control.Feedback type="invalid">Please enter valid postal code.</Form.Control.Feedback>
            </Form.Group>
            </Row>
            <Row>
                <p></p>
                <Alert variant={registerResult.isSuccess? 'success': 'danger'} show={registerResult.message.length > 0}>{registerResult.message}</Alert>
            </Row>
            <Row className="d-flex justify-content-between align-items-center">
                <Col>
                    <Link to="..">Return to Login page</Link>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button variant="primary" type="submit" className="btn-custom">Register</Button>
                </Col>
            </Row>
        </Form>
        </div></Row>
    </Container>);

}

export default RegisterAccount;