import { Container, Table, Row, Col, Form, Button} from "react-bootstrap";
import { useLocation } from "react-router";
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { getToken } from "../utilities/auth";
import "./SubmitRequest.css";

interface RecycleRequestItem {
    category: string;
    quantity: number;
    unitOfMeasurement: string;
    description: string;
  }
interface RecycleRequest{
    email: string;
    contactPerson: string;
    contactNumber: string;
    collectionDate: string;
    promoCode: string;
    data: RecycleRequestItem[];
  }
  interface APIResponse
  {
      message: string;
      returnCode: string;
  }
const SubmitRequest = () => {
    const [isContactPersonValid, setisContactPersonValid] = useState(true);
    const [isContactNumberValid, setisContactNumberValid] = useState(true);
    const [isCollectionDateValid, setisCollectionDateValid] = useState(true);
    const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
        switch (event.target.id) {
          case 'collectionDate':
            setisCollectionDateValid(request.collectionDate.length > 0);
            break;
          case 'contactNumber':
            setisContactNumberValid(/^([0-9]){8}$/.test(request.contactNumber));
            break;
          case 'contactPerson':
            setisContactPersonValid(request.contactPerson.length > 0);
            break;
        }
      }
    const location = useLocation();
    let recycleRequest: RecycleRequestItem[] = [];
    if(location.state)
    {
        const { recycleRequestPass } = location.state;
        recycleRequest = recycleRequestPass as RecycleRequestItem[];
    }
    //console.log(recycleRequestPass);
    const initialRequest:RecycleRequest = {email: "", contactPerson:'', contactNumber:'', collectionDate: '', promoCode: '', data: recycleRequest} 
    const [request, setRequest] = useState<RecycleRequest>(initialRequest);
    //console.log(request);
    const token = getToken();
    const [requestResult, setRequestResult] = useState<String>('');
    const navigate = useNavigate();

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        //console.log(event.target.id);      
        //console.log(event.target.name);      
        //console.log(event.target.value);
        //validate and set value      
        if(event.target.name === 'contactPerson')
        {
            setRequest(prevReq => {
                return {...prevReq, contactPerson: event.target.value}
            });
        }else if(event.target.name === 'contactNumber')
        {
            setRequest(prevReq => {
                return {...prevReq, contactNumber: event.target.value}
            });
 
        }else if(event.target.name === 'collectionDate')
        {
            setRequest(prevReq => {
                return {...prevReq, collectionDate: event.target.value}
            });
        }
    }

    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }

    const submitRequest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //validate request request
        //console.log('Submit Request token: '+token);
        //console.log(request)
        setisCollectionDateValid(request.collectionDate.length > 0);
        setisContactNumberValid(/^([0-9]){8}$/.test(request.contactNumber));
        setisContactPersonValid(request.contactPerson.length > 0);

        if(isCollectionDateValid && isContactNumberValid && isContactPersonValid)
        try
        {
            console.log('Submitting Request to '+process.env.REACT_APP_RECYCLE_API_URL+'/api/v1/request/recycle')
            const response = await axios.post(process.env.REACT_APP_RECYCLE_API_URL+'/api/v1/request/recycle', request, {
                headers: { Authorization: `Bearer ${token}` },
              });
            const apiResponse = response?.data as APIResponse
            console.log(response);
            if(apiResponse?.message)
                setRequestResult(apiResponse.message);
            else
                setRequestResult("Your request is successfully submitted.");
                await timeout(1500); //for 1 sec delay
                navigate("/Home");
        }
        catch(error)
        {
            console.log(error);
            const err = error as AxiosError;
            const apiResponse = err.response?.data as APIResponse
            //console.log(err.response?.data);
            if(apiResponse?.message)
                setRequestResult(apiResponse.message);
            else
                setRequestResult("Error when registering. Please try again.");
        }
    }



    return (<Container fluid className="pt-5">

      <div className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
        <div className=" ">
          <h1 className="text-center p-3">Recycle Cart</h1>
          <h2 className="text-center">Step 2) Submit Request</h2>
        </div>
        <Form onSubmit={submitRequest}>
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
                {recycleRequest.map((item, index: number) => (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unitOfMeasurement}</td>
                    <td>{item.description}</td>
                    <td>
                    </td>
                </tr>
                ))}

                <tr>
                <td colSpan={5}>Total</td>
                <td>
                </td>
                </tr>
            </tbody>
            </Table>
            <Table>
                <Row>
                    <Col>
                        <Form.Group controlId="contactPerson">
                        <Form.Label>Contact Person</Form.Label>
                        <Form.Control
                            type="text"
                            name="contactPerson" 
                            onChange={onChangeHandler}
                            required
                        />
                        </Form.Group>
                        </Col>
                    <Col>
                        <Form.Group controlId="contactNumber">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="contactNumber"
                            onChange={onChangeHandler}
                            required
                        />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="Collection Date">
                        <Form.Label>Collection Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="collectionDate"
                            onChange={onChangeHandler}
                            required
                        />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Link to="/price" state={{recycleRequestPass: recycleRequest}}>
                    <Button
                    className="button"
                    variant="danger"
                    type="button"      
                    >
                    Back
                    </Button></Link>
                    </Col>
                    <Col className="d-flex justify-content-end">
                    <Button type="submit" variant="success" className="submit-button">
                        Submit
                    </Button></Col>
                </Row>
                <Row>
                    <Col>
                    {requestResult && <div className="text-success mr-2 d-inline-block">{requestResult}</div>}
                    </Col>
                </Row>
          </Table>
        </Form>
    </div>
    </Container>);

}

export default SubmitRequest;