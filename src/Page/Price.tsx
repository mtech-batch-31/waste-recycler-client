import React, { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./Price.css";
import axios from "axios";
// import MockAdapter from 'axios-mock-adapter'; // import the mocking library
import Cookies from "js-cookie";
import { TABLE_DATA, CATEGORY_DATA, API_PATH } from "../utilities/constants";
import { getToken, removeToken } from "../utilities/auth";

interface RecycleCategoriesResponseItem {
    category: string;
    unitOfMeasurement: string;
}

interface RecyclePriceResponse {
  returnCode: string;
  message: string;
  totalPrice: number;
  promoCode: string;
  items: RecyclePriceResponseItem[];
}

interface RecyclePriceResponseItem {
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  subTotalPrice: number;
  description: string
  unitOfMeasurement: string;
}

interface RecycleRequestItem {
  category: string;
  quantity: number;
  unitOfMeasurement: string;
  description: string;
}

interface RecycleFormState {
  category: string;
  quantity: number;
  unitOfMeasurement: string;
  description: string;
  promoCode: string;
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
  const navigate = useNavigate();
  const recycleFormDataEmpty: RecycleFormState = {
    category: "",
    quantity: 0,
    unitOfMeasurement: "unit",
    description: "",
    promoCode: ""
  };
  const recyclePriceRespEmpty: RecyclePriceResponse = {
    returnCode: "",
    message: "",
    promoCode: "",
    totalPrice: 0,
    items: [],
  };

  const recycleRequestEmpty: RecycleRequestItem[] = [];
  const [recycleCategories, setRecycleCategories] = useState<RecycleCategoriesResponseItem[]>([]);
  useState<RecycleRequestItem[]>(recycleRequestEmpty);
  const [recycleRequest, setRecycleRequest] =
    useState<RecycleRequestItem[]>(recycleRequestEmpty);
  // const [isQuantityValid, setIsQuantityValid] = useState(true);
  const [recyclePriceResponse, setRecyclePriceResponse] =
    useState<RecyclePriceResponse>(recyclePriceRespEmpty);
    const [promoCode, setPromoCode] = useState<string>("");
  const [formData, setFormData] = useState<RecycleFormState>(recycleFormDataEmpty);
  // const [formData, setFormData] = useState<LoginFormState>(initialFormData);
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");


  const validateToken = () => {
    const token = getToken();
    if (token) {
      axios
        .get(`${process.env.REACT_APP_RECYCLE_API_URL}/api/v1/auth/test`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            console.log("auth test response", res.data);
        })
        .catch((err) => {
            console.error("error when calling categories API",err);
            removeToken();
        });
    } else {
      console.log("token not found from Cookie");
      navigate("/");
    }
  }


  useEffect(() => {
    validateToken();
    const token = getToken();
    if (token) {
      axios
        .get(`${process.env.REACT_APP_RECYCLE_API_URL}/api/v1/request/categories`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            console.log("categories response", res.data);
            setRecycleCategories(res.data.categories);
        })
        .catch((err) => {
            console.error("error when calling categories API",err);
            Cookies.remove("access_token")
            navigate("/");
        });
    } else {
      console.log("token not found from Cookie");
      navigate("/");
    }
  }, []);

  const getUnitOfMeasurement = (category: string) => {
    console.log("getUnitOfMeasurement for category:", category);
    try {
      return recycleCategories.filter((c) => c.category == category)[0].unitOfMeasurement;
    } catch (error) {
      console.error(error);
    }
    return "";
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleInputChange called - event:", event);
    const { name, value } = event.target;
    console.log("handleInputChange called - name: ", name, ", value: ", value);

    if (name == "category") {
      console.log("changing category");
      setFormData({
        ...formData,
        [name]: value,
        unitOfMeasurement: getUnitOfMeasurement(value),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    console.log("handleInputChange called - formData", formData);
  };

  const handleClear = () => {
    console.log("handleClear");
    setRecyclePriceResponse(recyclePriceRespEmpty);
    setRecycleRequest(recycleRequestEmpty);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("form submit, formData", formData);

    if (formData.category == ""){
      console.error("invalid category");
      setErrorMessage("Please select a category")
      return;
    } else if (formData.quantity <= 0.1) {
      // setIsQuantityValid(false);
      console.error("invalid quantity");
      setErrorMessage("Invalid quantity")
      return;
    }
    const newRecycleRequest = [
      ...recycleRequest,
      {
        category: formData.category,
        quantity: formData.quantity,
        description: formData.description,
        unitOfMeasurement: formData.unitOfMeasurement,
      },
    ];
    // setPromoCode(formData.promoCode);
    // setRecycleRequest(newRecycleRequest);
    console.log("form submit, recycleRequest: ", recycleRequest);
    const token = getToken();
    if (token) {
      console.log("token found from Cookies", token);
    } else {
      console.log("token not found");
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };

    let payload;
    if (formData.promoCode){
      payload = {
        promoCode: formData.promoCode,
        data: newRecycleRequest,
      };
    } else {
      payload = {
        promoCode: "",
        data: newRecycleRequest,
      };
    }
    console.log("headers", headers);
    console.log("payload", payload);
    try {
      const response = await axios.post(
        process.env.REACT_APP_RECYCLE_API_URL + API_PATH.PRICE,
        payload,
        { headers: headers }
      );
      console.log("price response", response);

      if (response.status == 200){
        let responseData : RecyclePriceResponse = response.data;
        responseData.items.map(item => item.unitOfMeasurement = getUnitOfMeasurement(item.category));
        responseData.promoCode = formData.promoCode;
        setRecyclePriceResponse(responseData);
        setRecycleRequest(newRecycleRequest);
        setPromoCode(formData.promoCode);
        setErrorMessage("");
      } else if (response.status == 403){
        removeToken();
        navigate("/");
      } 

    } catch (error) {
      console.log("error when calling price api", error);
      if (axios.isAxiosError(error)){
        console.log("axios error", error.response);
        if(error && error.response && error.response.data && error.response.data.message){
          setErrorMessage(error.response.data.message);
        }
      }
      
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
            {   recyclePriceResponse &&
                recyclePriceResponse.items &&
                recyclePriceResponse.items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unitOfMeasurement}</td>
                  <td>{item.description}</td>
                  <td>${item.subTotalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                </tr>
              ))}

              <tr>
                <td colSpan={5}>Total</td>
                <td>
                  ${recyclePriceResponse && recyclePriceResponse.totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                </td>
              </tr>
            </tbody>
          </Table>

          <Form noValidate className="pt-3" onSubmit={handleFormSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    name="category"
                    as="select"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Select an option</option>
                    {recycleCategories.map((c, index) => (
                      <option key={index} value={c.category}>
                        {c.category}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col xs={2}>
                <Form.Group controlId="quantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    // placeholder="E.g. 1 kg"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    // isInvalid={!isQuantityValid}
                    min="0.1"
                    step=".01"
                    // required
                  />
                  {/* <Form.Control.Feedback type="invalid">Invalid quantity</Form.Control.Feedback> */}
                </Form.Group>
              </Col>
              <Col xs={1} className="d-flex align-items-end">
                <span>{formData.unitOfMeasurement}</span>
              </Col>
              <Col>
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
              <Col
                xs={2}
                className="d-flex align-items-end justify-content-end"
              >
                <Button className="button" variant="primary" type="submit">
                  Add
                </Button>
              </Col>


            </Row>

            <div className="d-flex mt-3">

                  <Form.Group controlId="promocode">
                    <Form.Label>Promo Code</Form.Label>
                    <Form.Control
                      type="text"
                      // placeholder="Promo Code"
                      name="promoCode"
                      value={formData.promoCode}
                      onChange={handleInputChange}
                      // required
                    />
                  </Form.Group>
                  <div className=" d-flex mx-3">
                    <span className=" align-self-end">Promo Code Applied: {promoCode}</span>
                  </div>
            </div>
            {responseData && (
              <div className="text-success mr-2 d-inline-block">
                {responseData.message}
              </div>
            )}
            {errorMessage && (
              <div className="mt-4 text-danger">
                {errorMessage}
              </div>
            )}
            <br />
          </Form>
          <div className="mt-4 d-flex align-items-center justify-content-center">
            <Button
              className="button"
              variant="danger"
              onClick={handleClear}
            >
              Clear
            </Button>
            <Link className="mx-2 button" to="/submitRequest" state={{recycleRequestToSubmit: recyclePriceResponse.items, totalPrice: recyclePriceResponse.totalPrice}}>
            <Button
              className="w-100"
              variant="success"
            >
              Proceed
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Price;
