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

// import { AvForm, input } from "availity-reactstrap-validation"
import qrcode from "../assets/images/qrcode.png";
import Modal from "react-bootstrap/Modal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function Members() {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [form, setform] = useState({});

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

  const [user, setuser] = useState({});

  const Optionchange = (e) => {
    let myUser = { ...form };
    myUser.stateId = e.target.value;
    setform(myUser);
  };
  console.log(form.stateId);

  const navigate = useNavigate();

  const add = () => {
    const dataArray = new FormData();
    dataArray.append("name", form.name);
    dataArray.append("email", form.email);
    dataArray.append("contactNumber", form.contactNumber);
    dataArray.append("password", form.password);
    dataArray.append("dateOfBirth", form.dateOfBirth);
    dataArray.append("address", form.address);
    dataArray.append("gender", form.gender);
    dataArray.append("area", form.area);
    dataArray.append("stateId", form.stateId);
    dataArray.append("district", form.district);
    dataArray.append("city", form.city);
    dataArray.append("pinCode", form.pinCode);
    dataArray.append("sponsorId", sponsor.user_id);
    dataArray.append("sponsorUserId", sponsor.user_id);
    dataArray.append("aadhaarCard", form.aadhaarCard);

    // for (let i = 0; i < Files.length; i++) {
    //   dataArray.append("courseImg", Files[i]);
    // }
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/aquin/user-addmember",
        dataArray,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          if (res.status === 200) {
            toast(res.data.message);
            handleClose();
            clearForm();
            navigate('/Directmem')
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

  const [sponsor, setsponsor] = useState([]);
  // console.log(sponsor);

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
          setsponsor(res.data.memResult);
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

  const [state, setstate] = useState([]);
  // console.log(state);

  const states = () => {
    var token = sessionStorage.getItem("token");
    var _id = sessionStorage.getItem("UserId");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/state/getall-activestates",
        { },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          setstate(res.data.actStates);
          console.log(res.data.actStates)
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

  const [bankss, setbankss] = useState([]);
  // console.log(bankss);

  const banks = () => {
    var token = sessionStorage.getItem("token");
    var _id = sessionStorage.getItem("UserId");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/bank/getall-banks",
        { _id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          setbankss(res.data.banks);
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
    states();
    banks();
  }, []);

  const clearForm = () => {
    setform({
      name: "",
      email: "",
      contactNumber: "",
      aadhaarCard: "",
      pinCode: "",
      city: "",
      district: "",
      stateId: "",
      address: "",
      gender: "",
      dateOfBirth: "",
      password: "",
      area: "",
    });
  };

  return (
    <div>
      <Box sx={{ display: "flex" }} className="cardmrg">
        <div className="backgrounimgstyle">
          <Sidebar />
        </div>
        <div className="drawecontent">
          <Sidebarres />
        </div>
        <Row className="continer cotainerstyle2 mb-5" style={{ width: "100%" }}>
          <Col md={12}>
            <form
              method="post"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="mb-4">
                <h5>New Members</h5>
                <span style={{ fontSize: " 15px" }}>
                  <Link to="/Dashboard">Aquin</Link>{" "}
                  <i class="fa fa-angle-double-right" aria-hidden="true"></i>{" "}
                  New Members
                </span>
              </div>
              <Card>
                <CardBody>
                  <h4 className="card-title">Personal Details</h4>

                  <div className="needs-validation">
                    <Row>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">
                            Name<span className="text-danger">*</span>
                          </Label>
                          <input
                            placeholder="Name"
                            type="text"
                            errorMessage="Please provide a valid Name"
                            className="form-control"
                            id="validationCustom01"
                            required
                            name="name"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            value={form.name}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">
                            Mobile No<span className="text-danger">*</span>
                          </Label>
                          <input
                            placeholder="Mobile"
                            type="number"
                            errorMessage="Please provide a valid Mobile No"
                            className="form-control"
                            id="validationCustom07"
                            required
                            name="contactNumber"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            value={form.contactNumber}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">
                            Email<span className="text-danger">*</span>
                          </Label>
                          <input
                            className="form-control"
                            placeholder="Email"
                            type="email"
                            errorMessage="Please provide a valid Email Id"
                            id="validationCustom02"
                            required
                            name="email"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            value={form.email}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">
                            Date Of Birth<span className="text-danger">*</span>
                          </Label>
                          <input
                            placeholder="Date Of Birth"
                            type="date"
                            errorMessage="Please provide a valid DOB"
                            className="form-control"
                            id="validationCustom02"
                            required
                            name="dateOfBirth"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            value={form.dateOfBirth}
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom04">
                            Pin Code<span className="text-danger">*</span>
                          </Label>
                          <input
                            placeholder="Pin"
                            type="number"
                            errorMessage="Please provide a valid Pin"
                            className="form-control"
                            required
                            name="pinCode"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            value={form.pinCode}
                            id="validationCustom04"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">
                            Gender<span className="text-danger">*</span>
                          </Label>

                          <select
                            className="form-control"
                            id="exampleSelect"
                            required
                            name="gender"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            value={form.gender}
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-4">
                          <Label htmlFor="validationCustom012">
                            {" "}
                            Aadhar No<span className="text-danger">*</span>
                          </Label>
                          <input
                            placeholder="Aadhar No"
                            type="text"
                            errorMessage="Please provide a valid Sponsor Id"
                            className="form-control"
                            required
                            name="aadhaarCard"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            value={form.aadhaarCard}
                            id="validationCustom012"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-4">
                          <Label htmlFor="validationCustom012">
                            {" "}
                            Password<span className="text-danger">*</span>
                          </Label>
                          <input
                            placeholder="Password"
                            type="text"
                            errorMessage="Please provide a valid Sponsor Id"
                            className="form-control"
                            required
                            name="password"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            value={form.password}
                            id="validationCustom012"
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">
                            State<span className="text-danger">*</span>
                          </Label>

                          <select
                            errorMessage=" Please provide a valid State"
                            id="validationCustom03"
                            className="form-control"
                            required
                            onChange={(e) => {
                              Optionchange(e);
                            }}
                            name="stateId"
                            value={form.stateId}
                          >
                            <option value="">select State Name </option>
                            {state.map((opt) => {
                              return (
                                <option value={opt._id}>{opt.title}</option>
                              );
                            })}
                          </select>
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">
                            District<span className="text-danger">*</span>
                          </Label>
                          <input
                            placeholder="District"
                            type="text"
                            errorMessage=" Please provide a valid District"
                            className="form-control"
                            id="validationCustom05"
                            required
                            name="district"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            value={form.district}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">
                            City<span className="text-danger">*</span>
                          </Label>
                          <input
                            placeholder="City"
                            type="text"
                            errorMessage=" Please provide a valid City"
                            className="form-control"
                            required
                            name="city"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            value={form.city}
                            id="validationCustom05"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom04">
                            Area<span className="text-danger">*</span>
                          </Label>
                          <input
                            placeholder="Area"
                            type="text"
                            errorMessage="Please provide a valid area"
                            className="form-control"
                            id="validationCustom04"
                            required
                            name="area"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            value={form.area}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom09">
                            Address<span className="text-danger">*</span>
                          </Label>
                          <textarea
                            placeholder="Enter Address"
                            className="form-control"
                            required
                            name="address"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            value={form.address}
                            id="validationCustom09"
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col xl="12">
                        <h4 className="card-title">Sponsor Details</h4>
                        {/* <p className="card-title-desc">Personal Details</p> */}

                        <Row>
                          <Col md="6">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom012">
                                Sponsor Id<span className="text-danger">*</span>
                              </Label>
                              <input
                                placeholder="Sponsor Id"
                                type="text"
                                errorMessage="Please provide a valid Sponsor Id"
                                className="form-control"
                                id="validationCustom012"
                                required
                                name="sponsorUserId"
                                // onChange={(e) => {
                                //   handleChange(e);
                                // }}
                                disabled
                                value={sponsor.user_id}
                              />
                            </div>
                          </Col>

                          {/* <Col md="6">
                          <div className="mb-4">
                            <Label htmlFor="validationCustom02">
                              Sponsor Name<span className="text-danger">*</span>
                            </Label>
                            <input

                              placeholder="Sponsor Name"
                              type="text"
                              errorMessage="Please provide a valid Sponsor Name"
                              className="form-control"
                              validate={{ required: { value: true } }}
                              id="validationCustom02"
                              required
                              name="name"
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              value={form.name}
                            />
                          </div>
                        </Col> */}
                        </Row>
                      </Col>
                    </Row>

                    <div style={{ float: "right" }}>
                      <Row>
                        <Col>
                          <Button
                            color="danger"
                            className="membtnstyle"
                            onClick={clearForm}
                          >
                            Cancel
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            color="primary"
                            className="membtnstyle"
                            type="submit"
                          >
                            Submit
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </form>
          </Col>
          <ToastContainer />
        </Row>
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

export default Members;
