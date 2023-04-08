import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min"
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

const RegisterAccount = () => {

    return (
    <Container>
        <Form>
            <h1 className="custom-color">Register Account</h1>
            <Form.Group id="txtEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control id="txtEmail" type="email" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control className="form-control" id="txtPassword" type="password" />
            </Form.Group >
            <Form.Group>
                <Form.Label htmlFor="txtConfirmPassword">Confirm Password</Form.Label>
                <Form.Control className="form-control" id="txtConfirmPassword" type="password" />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="txtFirstName">First Name</Form.Label>
                <Form.Control  className="form-control" id="txtFirstName" type="text" />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="txtLastName">Last Name</Form.Label>
                <Form.Control className="form-control" id="txtLastName" type="text" />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="txtContact">Contact</Form.Label>
                <Form.Control className="form-control" id="txtContact" type="text" />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="txtAddress">Address</Form.Label>
                <Form.Control className="form-control" id="txtAddress" type="text" />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="txtPostalCode">Postal Code</Form.Label>
                <Form.Control className="form-control" id="txtPostalCode" type="text" />
            </Form.Group>
            <Row className="d-flex justify-content-between align-items-center">
                <Col>
                    <Button variant="primary" className="btn-custom-outline">Cancel</Button>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button variant="primary" type="submit" className="btn-custom">Register</Button>
                </Col>
            </Row>
        </Form>
    </Container>);

}

export default RegisterAccount;