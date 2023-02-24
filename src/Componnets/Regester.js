import React, { useState, useEffect } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Label } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Regester() {
  const [form, setform] = useState({});

  const [Files, setFiles] = useState("");
  const navigate = useNavigate();

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
  const handleChange1 = (e) => {
    let myUser = { ...form };
    myUser[e.target.name] = e.target.value;
    setform(myUser);
    var gs = e.target.value;
    getCategory2(gs);
  };

  const [user, setuser] = useState({});
  const [user2, setuser2] = useState([]);

  const Optionchange = (e) => {
    let myUser = { ...form };
    myUser.stateId = e.target.value;
    setform(myUser);
  };
  console.log(form.stateId);

  //     --form 'name="log2base5"' \
  // --form 'email="log2base5@gmail.com"' \
  // --form 'contactNumber="7848256925"' \
  // --form 'password="AQ123456"' \
  // --form 'dateOfBirth="1998-09-26"' \
  // --form 'gender="Male"' \
  // --form 'address="kphb, hyd"' \
  // --form 'area="kphb"' \
  // --form 'stateId="633ed0b7dc5f136f07bf55b6"' \
  // --form 'district="Ranga Reddy"' \
  // --form 'city="Hyderabad"' \
  // --form 'pinCode="524651"' \
  // --form 'sponsorId="000002"'

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
    dataArray.append("sponsorId", form.sponsorId);

    // for (let i = 0; i < Files.length; i++) {
    //   dataArray.append("courseImg", Files[i]);
    // }
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/registr/member-register",
        dataArray
        // {
        //   headers: { Authorization: `Bearer ${token}` },
        // }
      )
      .then(
        (res) => {
          if (res.status === 200) {
            toast(res.data.message);
            clearForm();
            // navigate('/')
          }
        },
        (error) => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message);
          }
        }
      );
  };

  const getCategory2 = (gs) => {
    var token = sessionStorage.getItem("token");
    // const user_id = form.sponsorId
    const params = {
      user_id: gs,
    };

    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/member/get-memberbyuseridall",
        params

        // {
        //   headers: { Authorization: `Bearer ${token}` },
        // }
      )
      .then(
        (res) => {
          setuser(res.data);
          setuser2(res.data.memResult);
          console.log(res.data);
          // toast(res.data.message)
        },
        (error) => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message);
          } else if (error.response && error.response.status === 401) {
            toast(error.response.data.message);
            navigate("/login");
          }
        }
      );
  };

  const [state, setstate] = useState([]);
  // console.log(state);

  const states = () => {
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/state/getall-activestates",
        {}
      )
      .then((res) => {
        if (res.status == 200) {
          setstate(res.data.actStates);
          console.log(res.data);
        }
      });
  };

  useEffect(() => {
    states();
    getCategory2();
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
      sponsorId: "",
    });
  };
  return (
    <div>
      <div className="account-pages my-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={8} xl={8}>
              <Card className="overflow-hidden">
                <CardBody className="pt-0">
                  <h3 className="text-center mt-4">
                    <Link to="/" className="d-block auth-logo">
                      <img
                        src={logo}
                        style={{ width: "200px" }}
                        className="auth-logo-dark"
                      />
                    </Link>
                  </h3>

                  <div>
                    <h4 className="text-muted font-size-18 mb-1 text-center">
                      Free Register
                    </h4>
                    <p className="text-muted text-center">
                      Get your free Aquin account now.
                    </p>
                    <form
                      method="post"
                      onSubmit={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      <div className="form-horizontal mt-4">
                        <Row>
                          <Col md={6}>
                            <div className="mb-3">
                              <Label>Sponsor Id</Label>
                              <input
                                placeholder="Sponsor Id"
                                type="text"
                                errorMessage="Please provide a valid Sponsor Id"
                                className="form-control"
                                id="validationCustom012"
                                name="sponsorId"
                                onChange={(e) => {
                                  handleChange1(e);
                                }}
                                value={form.sponsorId}
                              />
                              {user.memResult == null ? (
                                <>
                                  <small className="text-danger">
                                    Invalid sponsor id
                                  </small>
                                </>
                              ) : (
                                <>
                                  {/* <Label htmlFor="validationCustom04">
                                sponsor Name
                              </Label> */}
                                  <small>{user2.name}</small>
                                </>
                                // <p>name</p>
                              )}
                            </div>
                            <div className="mb-3">
                              <Label>Mobile</Label>{" "}
                              <span className="text-danger">*</span>
                              <input
                                placeholder="Mobile"
                                type="text"
                                maxlength="10"
                                pattern="\d{10}"
                                className="form-control"
                                required
                                name="contactNumber"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                value={form.contactNumber}
                              />
                            </div>
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
                                 <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                              </select>
                            </div>
                            <div className="mb-3">
                              <Label>Date Of Birth</Label>{" "}
                              <span className="text-danger">*</span>
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

                            <div className="mb-3">
                              <Label>City</Label>{" "}
                              <span className="text-danger">*</span>
                              <input
                                placeholder="city"
                                type="text"
                                pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"
                                errorMessage="Please provide a valid area"
                                className="form-control"
                                id="validationCustom04"
                                required
                                name="city"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                value={form.city}
                              />
                            </div>

                            <div className="mb-3">
                              <Label>Pin Code</Label>{" "}
                              <span className="text-danger">*</span>
                              <input
                                placeholder="Pin"
                                type="text"
                                maxlength="6"
                                pattern="\d{6}"
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

                          <Col md={6}>
                            <div className="mb-3">
                              <Label>Name</Label>{" "}
                              <span className="text-danger">*</span>
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
                            <div className="mb-3">
                              <Label className="mt-4">Email</Label>{" "}
                              <span className="text-danger">*</span>
                              <input
                                placeholder="email"
                                type="email" 
                                pattern="(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
                                errorMessage="Please provide a valid Name"
                                className="form-control"
                                id="validationCustom01"
                                required
                                name="email"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                value={form.email}
                              />
                            </div>
                            <div className="mb-3">
                              <Label>Password</Label>{" "}
                              <span className="text-danger">*</span>
                              <input
                                placeholder="Password"
                                type="password"
                                minlength="6"
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

                            <div className="mb-3">
                              <Label htmlFor="validationCustom03">
                                State <span className="text-danger">*</span>
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
                                <option value="">Select state </option>
                                {state.map((opt) => {
                                  return (
                                    <option value={opt._id}>{opt.title}</option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="mb-3">
                              <Label>District</Label>{" "}
                              <span className="text-danger">*</span>
                              <input
                                placeholder="district"
                                type="text"
                                pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"
                                errorMessage="Please provide a valid area"
                                className="form-control"
                                id="validationCustom04"
                                required
                                name="district"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                value={form.district}
                              />
                            </div>

                            <div className="mb-3">
                              <Label>Area</Label>{" "}
                              <span className="text-danger">*</span>
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
                        <div className="mb-3">
                          <Label>Address</Label>{" "}
                          <span className="text-danger">*</span>
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

                        <div style={{ float: "right" }}>
                          {/* <Link to="/registers"> */}{" "}
                          <button
                            style={{ width: "100px" }}
                            className="btn btn-info w-md waves-effect waves-light"
                            type="submit"
                          >
                            Submit
                          </button>
                          {/* </Link> */}
                        </div>
                        <div style={{ padding: "50px 0px 0px 0px" }}>
                          <div className="">
                            {/* <p className="text-muted text-center mb-0 font-size-14">
                              By registering you agree to the Aquin{" "}
                              <Link to="#" className="text-primary">
                                Terms of Use
                              </Link>
                            </p> */}
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </CardBody>
              </Card>
              <div className="text-center">
                <p>
                  Already have an account ?{" "}
                  <Link to="/" className="text-primary">
                    {" "}
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Aquin
                  <span className="d-none d-sm-inline-block">
                    {" "}
                    - Designed{" "}
                    <i
                      class="fa fa-heart text-danger"
                      aria-hidden="true"
                    ></i>{" "}
                    by DigitalRaiz Creative Solutions.
                  </span>
                </p>
              </div>
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      </div>
    </div>
  );
}

export default Regester;
