import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Sidebarres from "./Sidebarres";
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  CardTitle,
  Label,
  Input,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Table from "react-bootstrap/Table";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { NavLink, Link } from "react-router-dom";
import mark from "../assets/images/mark1.jpg";
import avatar from "../assets/images/users/user-1.jpg";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import qrcode from "../assets/images/qrcode.png";
import Modal from "react-bootstrap/Modal";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Moment from "react-moment";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Withdrawal() {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setModal(!modal);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showResults, setShowResults] = React.useState(false);
  const showfield = () => setShowResults(true);
  const hidefield = () => setShowResults(false);

  const [user, setuser] = useState([]);
  const [user1, setuser1] = useState([]);
  const [user12, setuser12] = useState([]);
  const [user2, setuser2] = useState([]);
  console.log(user);

  const getCategory = () => {
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/coinxchange/getallcoinexchange",
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          setuser(res.data.coinXchnjResult);
        },
        (error) => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message);
          } else if (error.response && error.response.status === 401) {
            toast(error.response.data.message);
            navigate("/");
          }
        }
      );
  };
  const getCategory1 = () => {
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/transactlimit/get-transact",
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          setuser1(res.data.limitResult);
          setuser12(res.data);
          console.log(res.data);
        },
        (error) => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message);
          } else if (error.response && error.response.status === 401) {
            toast(error.response.data.message);
            navigate("/");
          }
        }
      );
  };
  const getCategory2 = () => {
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/coinval/get-coinval",
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          setuser2(res.data);
          console.log(res.data.singleCoinValue);
        },
        (error) => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message);
          } else if (error.response && error.response.status === 401) {
            toast(error.response.data.message);
            navigate("/");
          }
        }
      );
  };

  useEffect(() => {
    getCategory();
    getCategory1();
    getCategory2();
  }, []);

  const [search, setsearch] = useState("");
  const [listPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);

  const pagesVisited = pageNumber * listPerPage;
  const lists = user.slice(pagesVisited, pagesVisited + listPerPage);
  const pageCount = Math.ceil(user.length / listPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [form, setform] = useState({});
  const [form1, setform1] = useState({});

  const handleChange = (e) => {
    let myUser = { ...form };
    myUser[e.target.name] = e.target.value;
    setform(myUser);
    const coinval = user2.singleCoinValue * e.target.value;
    console.log(coinval);
    setform1(coinval);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    add();
  };

  const add = () => {
    const data = {
      requestcoins: parseInt(form.requestcoins),
    };
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/coinxchange/addcoinexchange",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          if (res.status === 200) {
            toast(res.data.message);
            clearForm();
            hidefield();
            getCategory();
          }
        },
        (error) => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message);
          }
        }
      );
  };

  const closeform = () => {
    clearForm1();
    hidefield();
  };

  const clearForm = () => {
    setform({
      title: "",
      description: "",
      singleCoinValue: "",
    });
  };

  const clearForm1 = () => {
    setform1({
      singleCoinValue: "",
    });
  };

  return (
    <div>
      {/* <Sidebar/> */}

      <Box sx={{ display: "flex" }} className="cardmrg">
        <div className="backgrounimgstyle">
          <Sidebar />
        </div>
        <div className="drawecontent">
          <Sidebarres />
        </div>

        <Row className="continer cotainerstyle mb-5" style={{ width: "100%" }}>
          <Col md={12}>
            <div className="mb-4">
              <h5>withdraw Request</h5>
              <span style={{ fontSize: " 15px" }}>
                <Link to="/Dashboard">Aquin</Link>{" "}
                <i class="fa fa-angle-double-right" aria-hidden="true"></i>{" "}
                withdraw Coins
              </span>
            </div>

            {showResults ? (
              <Card>
                <CardBody>
                  <div>
                    <div className="needs-validation">
                      <form
                        method="post"
                        onSubmit={(e) => {
                          handleSubmit(e);
                        }}
                      >
                        <Row className="mb-3">
                          <Col md={6}>
                            {user12.limitResult == null ? (
                              ""
                            ) : (
                              <Row>
                                <Col>
                                  <h5>Minimum Coins : {user1.minAmount}</h5>
                                </Col>
                                <Col>
                                  <h5>Maximum Coins : {user1.maxAmount}</h5>
                                </Col>
                              </Row>
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col md="2">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom01">
                                Coins <span className="text-danger">*</span>{" "}
                              </Label>
                              <input
                                className="form-control"
                                name="requestcoins"
                                placeholder="Enter Coins"
                                type="number"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                required
                              />
                            </div>
                          </Col>
                          <Col md="2">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom01">
                                Today Coins Price
                              </Label>
                              <input
                                className="form-control"
                                name="requestcoins"
                                placeholder="Enter Coins"
                                type="number"
                                disabled
                                // onChange={(e) => {
                                //   handleChange(e);
                                // }}
                                value={user2.singleCoinValue}
                              />
                            </div>
                          </Col>
                          <Col md="2">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom01">Amount</Label>
                              <input
                                className="form-control"
                                name="requestcoins"
                                placeholder="Enter Coins"
                                type="number"
                                // onChange={(e) => {
                                //   handleChange(e);
                                // }}
                                disabled
                                value={form1}
                              />
                            </div>
                          </Col>

                          <Col md="4">
                            <div className="mb-4 mt-4">
                              <Button
                                className="btn btn-success listbtns"
                                style={{ width: "110px" }}
                                type="submit"
                              >
                                Submit
                              </Button>
                              <Button
                                className="btn-danger listbtns"
                                style={{ width: "110px" }}
                                onClick={closeform}
                              >
                                Cancel
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </form>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ) : (
              ""
            )}

            <Card>
              <div style={{ float: "right" }} className=""></div>
              <div style={{ padding: "30px" }}>
                <div style={{ float: "right" }}>
                  <div class="form-inline my-2 my-lg-0">
                    <button
                      className="btn btn-outline-primary my-2 my-sm-0 adgustwidth"
                      onClick={() => {
                        setShowResults(!showResults);
                      }}
                    >
                      <i class="fa fa-plus-circle" aria-hidden="true"></i>{" "}
                      withdraw Coins
                    </button>
                    <input
                      type="search"
                      className="form-control mb-3 mt-3 ml-3 adgustwidth"
                      placeholder="Search..."
                      style={{ width: "200px" }}
                      onChange={(e) => {
                        setsearch(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <h5>withdraw Request</h5>
                {user.length >= 1 ? ( 
                <div className="table-responsive">
                  <Table striped bordered hover size="lg">
                    <thead>
                      <tr>
                        <th>SNo</th>
                        <th>Coins</th>
                        <th>Amount</th>
                        <th>Request Date</th>
                        <th>Status</th>
                        {/* <th>Approved Date</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {lists
                        .filter((value) => {
                          if (search === !null) {
                            return value;
                          } else if (
                            value.requestDate
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          ) {
                            return value;
                          }
                        })
                        .map((data, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{data.requestcoins}</td>
                              <td>{data.coinValue}</td>
                              <td>
                                <Moment format="DD-MM-YYYY">
                                  {data.requestDate}
                                </Moment>
                              </td>

                              {/* <td>{data.status}</td> */}
                              <td>
                                {data.status == "completed" ? (
                                  <span
                                    class="badge badge-sucess"
                                    style={{
                                      background: "green",
                                      color: "white",
                                    }}
                                  >
                                    {data.status}
                                  </span>
                                ) : (
                                  <span
                                    class="badge "
                                    style={{
                                      background: "red",
                                      color: "white",
                                    }}
                                  >
                                    {data.status}
                                  </span>
                                )}
                              </td>
                              {/* <td>
                                <Moment format="DD-MM-YYYY">
                                  {data.approveDate}
                                </Moment>
                              </td> */}
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </div>
                 ) : (
                  <center style={{ padding: "80px" }}>
                    {" "}
                    <h6>No Data Found</h6>
                  </center>
                )}
                <div style={{ float: "right" }} className="mt-2">
                  {/* <Pagination count={pageCount} variant="outlined" color="primary"     onPageChange={changePage}   total={lists.length}/> */}
                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"pagination"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"disabled"}
                    activeClassName={"active"}
                    total={lists.length}
                  />
                </div>
                
              </div>
            </Card>
          </Col>
        </Row>
        <ToastContainer />
      </Box>

      <Modal
        show={show}
        size="sm"
        style={{ marginTop: "100px" }}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading </Modal.Title>
          <span
            onClick={handleClose}
            style={{ float: "right", fontSize: "20px" }}
          >
            <i class="fa fa-times-circle" aria-hidden="true"></i>
          </span>
        </Modal.Header>
        <Modal.Body>
          <img src={qrcode} style={{ width: "100%" }} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Withdrawal;
