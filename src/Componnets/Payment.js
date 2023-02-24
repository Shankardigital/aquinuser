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
  Table,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { NavLink, Link } from "react-router-dom";
import mark from "../assets/images/mark1.jpg";
import avatar from "../assets/images/users/user-1.jpg";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

// import { AvForm, AvField } from "availity-reactstrap-validation"
import qrcode from "../assets/images/qrcode.png";
import Modal from "react-bootstrap/Modal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function Payment() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [form, setform] = useState({});
  console.log(form);
  const [form1, setform1] = useState([]);
  const [user1, setuser1] = useState([]);
  const [user12, setuser12] = useState([]);
  console.log(user1.status);

  const [Files, setFiles] = useState("");

  const changeHandler = (e) => {
    setFiles(e.target.files);
  };

  const handleChange = (e) => {
    let myUser = { ...form };
    myUser[e.target.name] = e.target.value;
    setform(myUser);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    add();
  };

  // const dataArray = new FormData();
  // dataArray.append("upiId", form.upiId);
  // dataArray.append("refNumber", form.refNumber);
  // dataArray.append("message", form.message);

  // const refdata= form.refNumber
  // console.log("data",refdata)

  const add = () => {
    var token = sessionStorage.getItem("token");

    const data = {
      upiId: form.upiId,
      refNumber: form.refNumber,
      message: form.message,
      selectPackage: form.selectPackage,
    };

    axios
      .post("https://aquinapi.aquin.us/api/v1/web/userpay/addpayinfo", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        (res) => {
          if (res.status === 200) {
            toast(res.data.message);
            getCategory();
            clearForm();
            setform1(res.data.userPayResult);
            console.log(form1);
            window.location.reload();
            // sessionStorage.setItem("refNumber", res.data.refNumber);
            // const refdata = sessionStorage.setItem("refNumber")
          }
        },
        (error) => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message);
          }else if (error.response && error.response.status === 401){
            toast(error.response.data.message);
            navigate("/");
          }
        }
      );
  };

  const clearForm = () => {
    setform({
      upiId: "",
      refNumber: "",
      message: "",
      selectPackage: "",
    });
  };

  const [user, setuser] = useState([]);
  const [user0, setuser0] = useState([]);
  console.log(user);

  const getCategory = () => {
    var token = sessionStorage.getItem("token");
    // const data12=form.refNumber
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/userpay/getpayinfo",
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setuser(res.data.userPayResult);
      },
      (error) => {
        if (error.response && error.response.status === 400) {
          toast(error.response.data.message);
        }else if (error.response && error.response.status === 401){
          toast(error.response.data.message);
          navigate("/");
        }
      }
      );
  };

  const getqrcode = () => {
    var token = sessionStorage.getItem("token");
    // const data12=form.refNumber
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/qrimg/getadminqr",
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setuser0(res.data.QrResult);
        setuser12(res.data);
        console.log(res.data.QrResult)
      },
      (error) => {
        if (error.response && error.response.status === 400) {
          toast(error.response.data.message);
        }else if (error.response && error.response.status === 401){
          toast(error.response.data.message);
          navigate("/");
        }
      }
      );
  };

  const myprofile = () => {
    var token = sessionStorage.getItem("token");
    var _id = sessionStorage.getItem("UserId");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/aquin/user-getprofile",
        { _id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          setuser1(res.data.memResult);
        }
      },
      (error) => {
        if (error.response && error.response.status === 400) {
          toast(error.response.data.message);
        }else if (error.response && error.response.status === 401){
          toast(error.response.data.message);
          navigate("/");
        }
      }
      );
  };

  useEffect(() => {
    myprofile();
    getCategory();
    getqrcode()
  }, []);
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
        {/* <CssBaseline /> */}
        <Row className="continer cotainerstyle2 mb-5" style={{ width: "100%" }}>
          <Col md={12}>
            <div className="mb-4">
              <h5>Payment</h5>
              <span style={{ fontSize: " 15px" }}>
                <Link to="/Dashboard">Aquin</Link>{" "}
                <i class="fa fa-angle-double-right" aria-hidden="true"></i>{" "}
                Payment
              </span>
            </div>
            <Card>
              {/* <CardTitle className="h4" style={{ padding: "20px" }}>Payment Details </CardTitle> */}
              <CardBody className="">
                <div className="mt-3">
                  <div className="cardstyles">
                    {user1.status == "" || user1.status == "rejected"? (
                      <form
                        method="post"
                        onSubmit={(e) => {
                          handleSubmit(e);
                        }}
                      >
                        <h5 style={{ cursor: "pointer" }} onClick={handleShow}>
                          Do the PAYMENT with QRCODE{" "}
                          <i class="fa fa-qrcode" aria-hidden="true"></i>
                        </h5>

                        <div className="needs-validation mt-3">
                          <div className="row">
                            <div className="col">
                              <div className="mb-4">
                                <Label htmlFor="validationCustom01">
                                  Select Package{" "}
                                  <span className="text-danger">*</span>
                                </Label>
                                <select
                                  name="selectPackage"
                                  required
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  value={form.selectPackage}
                                  className="form-control"
                                >
                                  <option value="">Select</option>
                                  <option value="500">500</option>
                                  <option value="1000">1000</option>
                                  <option value="1500">1500</option>
                                </select>
                              </div>

                              <div className="mb-4">
                                <Label htmlFor="validationCustom02">
                                  UTR/REFERENCE NO/UPI REF NO
                                  <span className="text-danger">*</span>
                                </Label>
                                <input
                                  placeholder="UTR/REFERENCE NO/UPI REF NO"
                                  type="text"
                                  errorMessage="Please provide a valid UTR/REFERENCE NO/UPI REF NO"
                                  className="form-control"
                                  name="refNumber"
                                  required
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  value={form.refNumber}
                                  id="validationCustom02"
                                />
                              </div>
                            </div>
                            <div className="col">
                              <div className="mb-4">
                                <Label htmlFor="validationCustom01">
                                  UPI Id<span className="text-danger">*</span>
                                </Label>
                                <input
                                  name="upiId"
                                  placeholder="UPI Id"
                                  type="text"
                                  errorMessage="Please provide a valid UPI Id"
                                  className="form-control"
                                  required
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  value={form.upiId}
                                  id="validationCustom01"
                                />
                              </div>
                              <div className="mb-4">
                                <Label htmlFor="validationCustom02">
                                  Message<span className="text-danger">*</span>
                                </Label>
                                <textarea
                                  className="form-control"
                                  placeholder="Enter message"
                                  name="message"
                                  required
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  value={form.message}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              {" "}
                              <p>
                                {/* <b>Your Payment processor is <span className="text-warning">pending</span></b> */}
                              </p>
                            </div>
                            <div className="col">
                              <div style={{ float: "right" }}>

                              <Button
                                  color="danger"
                                  style={{ width: "150px" }}
                                  className="m-1"
                                  onClick={clearForm}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  color="success"
                                  style={{ width: "150px" }}
                                  className="m-1"
                                >
                                  Submit
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <>
                        <h5>Your Payments details</h5>
                        <div className="table-responsive mt-3">
                          <Table striped bordered hover size="lg">
                            <thead>
                              <tr>
                                <th>Package</th>
                                <th>UPI Id</th>
                                <th>UTR/UPI REF NO</th>
                                <th>Message</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {user.map((data, i) => {
                                return (
                                  <tr>
                                    <td>{data.selectPackage}</td>
                                    <td>{data.upiId}</td>
                                    <td>{data.refNumber}</td>
                                    <td>{data.message}</td>
                                    <td>{data.status == ""? "pending":data.status}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </div>
                      </>
                    )}

                    {/* {user1.status == "rejected" ? (
                      <>
                        <form
                        className="mt-3"
                          method="post"
                          onSubmit={(e) => {
                            handleSubmit(e);
                          }}
                        >
                          <h5
                            style={{ cursor: "pointer" }}
                            onClick={handleShow}
                          >
                            Do the PAYMENT with QRCODE{" "}
                            <i class="fa fa-qrcode" aria-hidden="true"></i>
                          </h5>

                          <div className="needs-validation mt-3">
                            <div className="row">
                              <div className="col">
                                <div className="mb-4">
                                  <Label htmlFor="validationCustom01">
                                    Select Package{" "}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <select
                                    name="selectPackage"
                                    required
                                    onChange={(e) => {
                                      handleChange(e);
                                    }}
                                    value={form.selectPackage}
                                    className="form-control"
                                  >
                                    <option value="">Select</option>
                                    <option value="500">500</option>
                                    <option value="1000">1000</option>
                                    <option value="1500">1500</option>
                                  </select>
                                </div>

                                <div className="mb-4">
                                  <Label htmlFor="validationCustom02">
                                    UTR/REFERENCE NO/UPI REF NO
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <input
                                    placeholder="UTR/REFERENCE NO/UPI REF NO"
                                    type="text"
                                    errorMessage="Please provide a valid UTR/REFERENCE NO/UPI REF NO"
                                    className="form-control"
                                    name="refNumber"
                                    required
                                    onChange={(e) => {
                                      handleChange(e);
                                    }}
                                    value={form.refNumber}
                                    id="validationCustom02"
                                  />
                                </div>
                              </div>
                              <div className="col">
                                <div className="mb-4">
                                  <Label htmlFor="validationCustom01">
                                    UPI Id<span className="text-danger">*</span>
                                  </Label>
                                  <input
                                    name="upiId"
                                    placeholder="UPI Id"
                                    type="text"
                                    errorMessage="Please provide a valid UPI Id"
                                    className="form-control"
                                    required
                                    onChange={(e) => {
                                      handleChange(e);
                                    }}
                                    value={form.upiId}
                                    id="validationCustom01"
                                  />
                                </div>
                                <div className="mb-4">
                                  <Label htmlFor="validationCustom02">
                                    Message
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <textarea
                                    className="form-control"
                                    placeholder="Enter message"
                                    name="message"
                                    required
                                    onChange={(e) => {
                                      handleChange(e);
                                    }}
                                    value={form.message}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                {" "}
                                <p>
                                 
                                </p>
                              </div>
                              <div className="col">
                                <div style={{ float: "right" }}>
                                  <Button
                                    className="success"
                                    style={{ width: "150px" }}
                                  >
                                    Submit
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>

                        <h5>Your Payments deetails</h5>
                        <div className="table-responsive mt-3">
                          <Table striped bordered hover size="lg">
                            <thead>
                              <tr>
                                <th>Package</th>
                                <th>UPI Id</th>
                                <th>UTR/UPI REF NO</th>
                                <th>Message</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {user.map((data, i) => {
                                return (
                                  <tr>
                                    <td>{data.selectPackage}</td>
                                    <td>{data.upiId}</td>
                                    <td>{data.refNumber}</td>
                                    <td>{data.message}</td>
                                    <td>{user1.status}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </div>
                      </>
                    ) : (
                      ""
                    )} */}

                    <ToastContainer />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Box>
      {/* <Modal
          isOpen={modal}
          style={{ width: '30%', marginTop: "100px" }}
          toggle={toggle}
        >
          <ModalHeader toggle={toggle}>
              <span>QRCODE</span>
          </ModalHeader>
          <ModalBody>
            <img src={qrcode} style={{ width: "100%" }} />
          </ModalBody>
        </Modal> */}

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
          {user12.QrResult == null ?(
            ""
          ):(
          <img src={"https://aquinapi.aquin.us" + "/" + user0.qrImage} style={{ width: "100%" }} />
          )}
        </Modal.Body>
      </Modal>

      {/* <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal> */}
    </div>
  );
}

export default Payment;
