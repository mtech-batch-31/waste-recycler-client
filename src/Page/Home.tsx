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
  items: RecyclePriceResponseItem[];
}

interface RecyclePriceResponseItem {
  name: string;
  quantity: number;
  unitPrice: number;
  subTotalPrice: number;
}
interface RecycleRequest{
  email: string;
  contactPerson: string;
  contactNumber: string;
  collectionDate: string;
  collectionStatus: string;
  promoCode: string;
  dbItems: RecycleRequestItem[];
}

interface RecycleRequestItem {
  category: string;
  quantity: number;
  unitPrice: number;
  subTotalPrice: number;
  // unitOfMeasurement: string;
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



const Home: React.FC = () => {
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
    totalPrice: 0,
    items: [],
  };

  const recycleRequestEmpty: RecycleRequest = {
    email: "",
    contactPerson: "",
    contactNumber: "",
    collectionDate: "",
    collectionStatus: "",
    promoCode: "",
    dbItems: []
  };
  const [recycleCategories, setRecycleCategories] = useState<RecycleCategoriesResponseItem[]>([]);
  // useState<RecycleRequestItem[]>(recycleRequestEmpty);
  const [recycleRequest, setRecycleRequest] = useState<RecycleRequest>(recycleRequestEmpty);

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

      axios
        .get(`${process.env.REACT_APP_RECYCLE_API_URL+API_PATH.RETRIEVE}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            const d = res.data;
            console.log("retrieve response", d);
            console.log("data[0]", d.data[0]);
            setRecycleRequest(d.data[0]);
        })
        .catch((err) => {
            console.error("error when calling retrive API",err);
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

  return (
    <Container fluid className="pt-5">
      <div>
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
          <div className=" ">
            <h1 className="p-3">Upcoming Collection</h1>
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
              {recycleRequest && recycleRequest.dbItems && recycleRequest.dbItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>{getUnitOfMeasurement(item.category)}</td>
                  <td>{item.description}</td>
                  <td>
                    $ {item.subTotalPrice}
                  </td>
                </tr>
              ))}

              <tr>
                <td colSpan={5}>Total</td>
                <td>
                  ${recyclePriceResponse && recyclePriceResponse.totalPrice}
                </td>
              </tr>
            </tbody>
          </Table>

          {/* <Form className="pt-3" onSubmit={handleFormSubmit}>
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
                    min="0.1"
                    step=".01"
                    // required
                  />
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
              <div className="mt-2 text-danger mr-2 d-inline-block">
                {errorMessage}
              </div>
            )}
            <br />
          </Form> */}
        </div>
      </div>
    </Container>
  );
};

export default Home;
