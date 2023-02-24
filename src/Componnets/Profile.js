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

// import { div, input } from "availity-reactstrap-validation"
import qrcode from "../assets/images/qrcode.png";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [user, setuser] = useState([]);

  const toggle = () => setModal(!modal);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showResults, setShowResults] = React.useState(false);
  const showfield = () => setShowResults(true);
  const hidefield = () => setShowResults(false);

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
          console.log(res.data.memResult);
          setuser(res.data.memResult);
          sessionStorage.setItem("profileImage", res.data.memResult.profileImage)
          sessionStorage.setItem("sponsorId", res.data.memResult.sponsorId)
          sessionStorage.setItem("sponsorUserId", res.data.memResult.sponsorUserId)
        }
      },
      (error) => {
        if (error.response && error.response.status === 400) {
          toast(error.response.data.message);
        }else if (error.response && error.response.status === 401) {
          toast(error.response.data.message);
          navigate("/");
        }
      }
      );
  };

  useEffect(() => {
    myprofile();
  }, []);

  const [form, setform] = useState([]);

  const handleChange = (e) => {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setuser(myUser);
  };

  const handleSubmit = (e) => {
    updateCategory();
    e.preventDefault();
  };

  const addCategory = () => {
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/aquin/user-changepass",
        {
          currentPassword: form.currentPassword,
          newPlainPassword: form.newPlainPassword,
          confirmPassword: form.confirmPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          if (res.status === 200) {
            toast(res.data.message);
            clearForm();
          }
        },
        (error) => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message);
          }else if (error.response && error.response.status === 401) {
            toast(error.response.data.message);
            navigate("/");
          }
        }
      );
  };

  const clearForm = () => {
    setform({
      currentPassword: "",
      newPlainPassword: "",
      confirmPassword: "",
    });
  };

  const handleChange1 = (e) => {
    let myUser = { ...form };
    myUser[e.target.name] = e.target.value;
    setform(myUser);
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();

    addCategory();
  };

  const changeHandler = (e) => {
    setFiles(e.target.files);
  };

  const [Files, setFiles] = useState("");

  //   --form 'name="new member"' \
  // --form 'email="newmember1@gmail.com"' \
  // --form 'contactNumber="8475847590"' \
  // --form 'dateOfBirth="2022-09-27"' \
  // --form 'gender="Male"' \
  // --form 'address="JNTU - Hitech City Road, K P H B Phase 1, Kukatpally, Hyderabad, Telangana 500072"' \
  // --form 'area="kphb"' \
  // --form 'stateId="633ed0d3dc5f136f07bf55b9"' \
  // --form 'district="Ranga Reddy"' \
  // --form 'city="Hyderabad"' \
  // --form 'profileImg=@"/C:/Users/NISHAT FATEMA/Downloads/india-pincode-map.jpg"' \
  // --form 'pinCode="524651"' \
  // --form 'sponsorId="223131151"' \
  // --form 'status="true"'

  const updateCategory = () => {
    const data1 = user._id;
    const dataArray = new FormData();
    dataArray.append("name", user.name);
    dataArray.append("email", user.email);
    dataArray.append("contactNumber", user.contactNumber);
    dataArray.append("dateOfBirth", user.dateOfBirth);
    dataArray.append("gender", user.gender);
    dataArray.append("address", user.address);
    dataArray.append("area", user.area);
    dataArray.append("stateId", user.stateId);
    dataArray.append("district", user.district);
    dataArray.append("city", user.city);
    dataArray.append("pinCode", user.pinCode);
    dataArray.append("sponsorId", user.sponsorId);
    for (let i = 0; i < Files.length; i++) {
      dataArray.append("profileImg", Files[i]);
    }
    var token = sessionStorage.getItem("token");
    axios
      .put(
        "https://aquinapi.aquin.us/api/v1/web/aquin/user-editprofile" +
          "/" +
          data1,
        dataArray,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          if (res.status === 200) {
            toast(res.data.message);
            myprofile();
            handleClose()
          }
        },
        (error) => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message);
          }else if (error.response && error.response.status === 401) {
            toast(error.response.data.message);
            navigate("/login");
          }
        }
      );
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

        {/* <CssBaseline /> */}
        <Row className="continer cotainerstyle2 mb-5" style={{ width: "100%" }}>
          <Col md={12}>
            <div className="mb-4">
              <h5>Profile</h5>
              <span style={{ fontSize: " 15px" }}>
                <Link to="/Dashboard">Aquin</Link>{" "}
                <i class="fa fa-angle-double-right" aria-hidden="true"></i>{" "}
                Profile
              </span>
            </div>

            {/* <Card>
            <CardBody> */}
            <Card className="directory-card">
              <div>
                <div className="directory-bg text-center">
                  <div className="directory-overlays">
                    <img
                      className="rounded-circle avatar-lg img-thumbnail"
                      src={
                        "https://aquinapi.aquin.us" + "/" + user.profileImage} width="100"
                      alt="alt"
                    />
                  </div>
                </div>

                <div className="directory-content text-center p-4">
                  <p className="font-size-16 mt-4 ">Id No : {user.user_id}</p>
                  <h5 className="font-size-16">{user.name}</h5>
                  {/* <p className="font-size-16">Katherine@gmail.com</p>
                    <p className="font-size-16">9999568245</p> */}

                  {/* <p className="text-muted">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</p> */}
                </div>
              </div>
            </Card>
            <Row>
              <Col md="6">
                <Card>
                  <CardBody>
                    <h5>User Details</h5>
                    <div className="row mt-4">
                      <div className="col-4">
                        <p>
                          <b>Name :</b>
                        </p>
                        <p>
                          <b>Email :</b>
                        </p>
                        <p>
                          <b>Mobile :</b>
                        </p>
                        <p>
                          <b>Area :</b>
                        </p>
                        <p>
                          <b>City :</b>
                        </p>
                        <p>
                          <b>State :</b>
                        </p>
                        <p>
                          <b>Address :</b>
                        </p>
                        {/* <p><b>Id No :</b></p> */}
                      </div>
                      <div className="col-8">
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                        <p>{user.contactNumber}</p>
                        <p>{user.area}</p>
                        <p>{user.city}</p>
                        <p>{user.stateName}</p>
                        <p>{user.address}</p>
                        {/* <p>100935</p> */}
                      </div>
                    </div>
                    <Button
                      className="form-control  mt-3 mb-4"
                      onClick={handleShow}
                      style={{
                        float: "right",
                        background: "#232323",
                        color: "white",
                        border: "none",
                        width: "150px",
                      }}
                    >
                      Update
                    </Button>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6">
                <Card>
                  <CardBody>
                    <form
                      method="post"
                      onSubmit={(e) => {
                        handleSubmit1(e);
                      }}
                    >
                      <h5>Change Password</h5>
                      <div className="needs-validation mt-4">
                        <div className="mb-4">
                          <Label htmlFor="validationCustom01">
                            Old Password
                          </Label>
                          <input
                            name="currentPassword"
                            placeholder="Old Password"
                            type="text"
                            errorMessage="Old Password"
                            className="form-control"
                            // validate={{ required: { value: true } }}
                            required
                            id="validationCustom01"
                            value={form.currentPassword}
                            onChange={(e) => {
                              handleChange1(e);
                            }}
                          />
                        </div>
                        <div className="mb-4">
                          <Label htmlFor="validationCustom01">
                            New Password
                          </Label>
                          <input
                            placeholder="New Password"
                            type="text"
                            errorMessage="New Password"
                            className="form-control"
                            // validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={form.newPlainPassword}
                            name="newPlainPassword"
                            required
                            onChange={(e) => {
                              handleChange1(e);
                            }}
                          />
                        </div>
                        <div className="mb-4">
                          <Label htmlFor="validationCustom01">
                            Confirm Password
                          </Label>
                          <input
                            // name="Confirm Password"
                            placeholder="Confirm Password"
                            type="text"
                            errorMessage="Confirm Password"
                            className="form-control"
                            // validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={form.confirmPassword}
                            name="confirmPassword"
                            required
                            onChange={(e) => {
                              handleChange1(e);
                            }}
                          />
                        </div>

                        <div style={{ float: "right" }}>
                          <Button
                            className="mb-4"
                            type="submit"
                            style={{
                              width: "150px",
                              background: "#232323",
                              color: "white",
                              border: "none",
                            }}
                          >
                            Update{" "}
                          </Button>
                        </div>
                      </div>
                    </form>
                    <ToastContainer />
                  </CardBody>
                </Card>
              </Col>
            </Row>

            {/* </CardBody>
          </Card> */}
          </Col>
        </Row>
      </Box>
      <Modal
        show={show}
        size="lg"
        style={{ marginTop: "100px" }}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User Details </Modal.Title>
          <span
            onClick={handleClose}
            style={{ float: "right", fontSize: "20px" }}
          >
            <i class="fa fa-times-circle" aria-hidden="true"></i>
          </span>
        </Modal.Header>
        <Modal.Body>
          <form
            method="post"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="needs-validation">
              <Row>
                <Col md="6">
                  <div className="mb-4">
                    <Label htmlFor="validationCustom01">Name</Label>
                    <input
                      placeholder="Name"
                      type="text"
                      errorMessage="Name"
                      className="form-control"
                      id="validationCustom01"
                      name="name"
                      value={user.name}
                      required
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="validationCustom01">Phone No</Label>
                    <input
                      placeholder="Phone No"
                      type="number"
                      errorMessage="Phone No"
                      className="form-control"
                      id="validationCustom01"
                      name="contactNumber"
                      value={user.contactNumber}
                      required
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="validationCustom01">Gender</Label>

                    <select
                      className="form-control"
                      name="gender"
                      value={user.gender}
                      required
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <Label
                      htmlFor="validationCustom01"
                      name="stateId"
                      value={user.stateId}
                      required
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      State
                    </Label>
                    <select className="form-control">
                      <option>Telangana</option>
                      <option>Andhra Pradesh</option>
                      <option>Goa</option>
                      <option>Odisha</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="validationCustom01">City</Label>
                    <input
                      placeholder="Enter City"
                      type="text"
                      errorMessage="Enter valid City"
                      className="form-control"
                      id="validationCustom01"
                      name="city"
                      value={user.city}
                      required
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="validationCustom01">Address</Label>
                    <textarea
                      placeholder="Enter Address"
                      type="date"
                      errorMessage="Enter Address"
                      className="form-control"
                      id="validationCustom01"
                      name="address"
                      value={user.address}
                      required
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                </Col>
                <Col md="6">
                  <div className="mb-4">
                    <Label htmlFor="validationCustom01">Email</Label>
                    <input
                      placeholder="Email"
                      type="text"
                      errorMessage="Email"
                      className="form-control"
                      id="validationCustom01"
                      name="email"
                      value={user.email}
                      required
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="validationCustom01">Date Of Birth</Label>
                    <input
                      placeholder="Date Of Birth"
                      type="date"
                      errorMessage="Enter Date Of Birth"
                      className="form-control"
                      id="validationCustom01"
                      name="dateOfBirth"
                      value={user.dateOfBirth}
                      required
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="validationCustom01">Area</Label>
                    <input
                      placeholder="Enter Area"
                      type="text"
                      errorMessage="Enter valid Area"
                      className="form-control"
                      name="area"
                      value={user.area}
                      required
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      id="validationCustom01"
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="validationCustom01">District</Label>
                    <input
                      placeholder="Enter District"
                      type="text"
                      errorMessage="Enter District"
                      className="form-control"
                      name="district"
                      value={user.district}
                      required
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      id="validationCustom01"
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="validationCustom01">Pin Code</Label>
                    <input
                      placeholder="Enter Pin Code"
                      type="text"
                      errorMessage="Enter valid Pin Code"
                      className="form-control"
                      value={user.pinCode}
                      name="pinCode"
                      required
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      id="validationCustom01"
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="validationCustom01">Profile</Label>
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      multiple
                      onChange={changeHandler}
                      
                    />
                  </div>
                </Col>
              </Row>
            </div>

            <div style={{ float: "right" }}>
             
              <button
                className="btn btn-danger "
                style={{ width: "120px" }}
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="btn btn-success ml-2"
                style={{ width: "120px" }}
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Profile;
