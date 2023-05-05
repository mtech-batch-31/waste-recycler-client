import React, { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./Home.css";
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

interface RecycleRequest {
  id: string;
  email: string;
  contactPerson: string;
  contactNumber: string;
  collectionDate: string;
  collectionStatus: string;
  promoCode: string;
  totalPrice: number;
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
    promoCode: "",
  };
  const recyclePriceRespEmpty: RecyclePriceResponse = {
    returnCode: "",
    message: "",
    totalPrice: 0,
    items: [],
  };

  const recycleRequestEmpty: RecycleRequest = {
    id: "",
    email: "",
    contactPerson: "",
    contactNumber: "",
    collectionDate: "",
    collectionStatus: "",
    promoCode: "",
    totalPrice: 0,
    dbItems: [],
  };
  const [recycleCategories, setRecycleCategories] = useState<
    RecycleCategoriesResponseItem[]
  >([]);

  const [recycleRequests, setRecycleRequests] = useState<RecycleRequest[]>([]);

  const [recycleRequest, setRecycleRequest] =
    useState<RecycleRequest>(recycleRequestEmpty);

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
          console.error("error when calling categories API", err);
          removeToken();
        });
    } else {
      console.log("token not found from Cookie");
      navigate("/");
    }
  };

  useEffect(() => {
    validateToken();
    const token = getToken();
    if (token) {
      axios
        .get(
          `${process.env.REACT_APP_RECYCLE_API_URL}/api/v1/request/categories`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log("categories response", res.data);
          setRecycleCategories(res.data.categories);
        })
        .catch((err) => {
          console.error("error when calling categories API", err);
          Cookies.remove("access_token");
          navigate("/");
        });

      axios
        .get(`${process.env.REACT_APP_RECYCLE_API_URL + API_PATH.RETRIEVE}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const response = res.data;
          console.log("retrieve response", response);
          console.log("data", response.data);
          if (!response.data) {
            return;
          }
          let recycleReqs: RecycleRequest[] = response.data;
          setRecycleRequests(response.data);
          let pendingRecycleReq: RecycleRequest;
          recycleReqs = recycleReqs.filter((r) =>
            r.collectionStatus.toLocaleLowerCase().includes("pending")
          );
          if (recycleReqs.length >= 0) {
            setRecycleRequest(recycleReqs[0]);
          }
        })
        .catch((err) => {
          console.error("error when calling retrive API", err);
          Cookies.remove("access_token");
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
      return recycleCategories.filter((c) => c.category == category)[0]
        .unitOfMeasurement;
    } catch (error) {
      console.error(error);
    }
    return "";
  };

  return (
    <Container fluid className="pt-5">
      <div>
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
          <section id="upcoming-collection">
            <div className="">
              <h1 className="">Upcoming Collection</h1>
            </div>

            {!recycleRequest.id && (
              <div className="my-3">No upcoming collection</div>
            )}
            {recycleRequest.id && (
              <div className="my-4">
                <div className="req-details mb-3">
                  <div className="row d-flex justify-content-between">
                    <div className="col">
                      <span className="field-label">Collection Date:</span>{" "}
                      {recycleRequest.collectionDate.substring(
                        0,
                        recycleRequest.collectionDate.length - 3
                      )}
                    </div>
                    <div className="col">
                      <span className="field-label">Status: </span>
                      {recycleRequest.collectionStatus}
                    </div>
                  </div>
                  <div className="">
                    <span className="field-label">Promo Code: </span>
                    {recycleRequest.promoCode}
                  </div>
                  <div className="row d-flex justify-content-between">
                    <div className="col">
                      <span className="field-label">Contact Person: </span>
                      {recycleRequest.contactPerson}
                    </div>
                    <div className="col ">
                      <span className="field-label">Contact Number: </span>
                      {recycleRequest.contactNumber}
                    </div>
                  </div>
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
                    {recycleRequest &&
                      recycleRequest.dbItems &&
                      recycleRequest.dbItems.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.category}</td>
                          <td>{item.quantity}</td>
                          <td>{getUnitOfMeasurement(item.category)}</td>
                          <td>{item.description}</td>
                          <td>$ {item.subTotalPrice}</td>
                        </tr>
                      ))}

                    <tr>
                      <td colSpan={5}>Total</td>
                      <td>${recycleRequest && recycleRequest.totalPrice}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            )}
          </section>

          <section id="past-collections">
            <div className="mt-5">
              <h1 className="">Past Collections</h1>
            </div>
            {recycleRequests
              .filter(
                (req) => req.collectionStatus.toLocaleLowerCase() == "collected"
              ).length < 1 && 
              <div className="my-3">No upcoming collection</div>
            }
            {recycleRequests
              .filter(
                (req) => req.collectionStatus.toLocaleLowerCase() == "collected"
              )
              .sort((a, b) => a.collectionDate.localeCompare(b.collectionDate))
              .reverse()
              .map((req) => (
                <div className="my-4">
                  <div className="row d-flex justify-content-between">
                    <div className="col">
                      <span className="field-label">Collection Date:</span>{" "}
                      {req.collectionDate.substring(
                        0,
                        req.collectionDate.length - 3
                      )}
                    </div>
                    <div className="col">
                      <span className="field-label">Status: </span>
                      {req.collectionStatus}
                    </div>
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
                      {req &&
                        req.dbItems &&
                        req.dbItems.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.category}</td>
                            <td>{item.quantity}</td>
                            <td>{getUnitOfMeasurement(item.category)}</td>
                            <td>{item.description}</td>
                            <td>$ {item.subTotalPrice}</td>
                          </tr>
                        ))}

                      <tr>
                        <td colSpan={5}>Total</td>
                        <td>${req && req.totalPrice}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              ))}
          </section>
        </div>
      </div>
    </Container>
  );
};

export default Home;
