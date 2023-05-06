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
    unitPrice: number;
    subTotalPrice: number;
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
  const initFormState: RecycleRequest = {
    email: '',
    contactPerson: '',
    contactNumber: '',
    collectionDate: '',
    promoCode: '',
    data: []
};
const SubmitRequest = () => {
    const location = useLocation();
    let recycleRequest: RecycleRequestItem[] = [];
    let totalPrice: number = 0.00
    if(location.state)
    {
        //const { data } = location.state;
        recycleRequest = location.state.recycleRequestToSubmit;
        totalPrice = location.state.totalPrice;
        console.log("recycleRequestToSubmit from getPrice:")
        console.log(recycleRequest);
        console.log("totalPrice from getPrice")
        console.log(totalPrice);    
    }

    const initialRequest:RecycleRequest = {email: "", contactPerson:'', contactNumber:'', collectionDate: '', promoCode: '', data: recycleRequest} 
    const [request, setRequest] = useState<RecycleRequest>(initialRequest);
    const [totalPriceDisplay] = useState<number>(totalPrice);
    //console.log(request);
    const token = getToken();
    const [requestResult, setRequestResult] = useState<String>('');

    const [isValidContactPerson, setIsValidContactPerson] = useState<boolean>(true);
    const [isValidContactNumber, setIsValidContactNumber] = useState<boolean>(true);
    const [isValidCollectionTime, setIsValidCollectionTime] = useState<boolean>(true);
    const navigate = useNavigate();

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        //console.log(event.target.id);      
        //console.log(event.target.name);      
        //console.log(event.target.value);
        //validate and set value      

        if(event.target.name === 'contactPerson')
        {
            setIsValidContactPerson(event.target.value.length > 0);
            setRequest(prevReq => {
                return {...prevReq, contactPerson: event.target.value}
            });
        }else if(event.target.name === 'contactNumber')
        {
            setIsValidContactNumber(/^([0-9]){8}$/.test(event.target.value));
            setRequest(prevReq => {
                return {...prevReq, contactNumber: event.target.value}
            });
        }else if(event.target.name === 'collectionDate')
        {
            setIsValidCollectionTime(isValidDate(event.target.value, 3));
            console.log(event.target.value);
            setRequest(prevReq => {
                return {...prevReq, collectionDate: event.target.value}
            });
        }
    }
    const isValidDate = (date: string, afterDays: number) => {
        var resultDate = Date.parse(date);
        var addDays = afterDays || 0;
        console.log(addDays);
        var addMs = addDays * 24 * 60 * 60 * 1000; 
        if(! isNaN(resultDate) && resultDate >= (Date.now() + addMs))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }

    const submitRequest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //validate request request
        setIsValidContactPerson(request.contactPerson.length > 0);
        setIsValidContactNumber(/^([0-9]){8}$/.test(request.contactNumber));
        setIsValidCollectionTime(isValidDate(request.collectionDate, 3));
        //console.log('Submit Request token: '+token);
        console.log(request)
        if(isValidCollectionTime && isValidContactNumber && isValidContactPerson){
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
    }
    return (
    <Container fluid className="pt-5">
      <div className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
        <div className=" ">
          <h1 className="text-center p-3">Recycle Cart</h1>
          <h2 className="text-center">Step 2 Submit Request</h2>
        </div>
        <Form onSubmit={submitRequest} >
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
                        <td>${item.subTotalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                        </td>
                    </tr>
                ))}

                <tr>
                <td colSpan={5}></td>
                <td>${totalPriceDisplay.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
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
                            isInvalid={!isValidContactPerson} />
                        <Form.Control.Feedback type="invalid">Please enter contact person.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="contactNumber">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="contactNumber"
                                onChange={onChangeHandler}
                                isInvalid={!isValidContactNumber} />
                            <Form.Control.Feedback type="invalid">Please enter valid contact number.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="Collection Date">
                            <Form.Label>Collection Date Time</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="collectionDate"
                                onChange={onChangeHandler}
                                isInvalid={!isValidCollectionTime} />
                            <Form.Control.Feedback type="invalid">Please enter valid collection date time.</Form.Control.Feedback>
                        <Form.Label>Collection Date</Form.Label>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Link to="/price" state={{recycleRequestPass: recycleRequest}}>
                            <Button variant="back" type="button">Back</Button>
                        </Link>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button type="submit">Submit</Button>
                    </Col>
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