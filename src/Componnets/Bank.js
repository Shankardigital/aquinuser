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
import qrcode from "../assets/images/bank.jfif";
import pan from "../assets/images/pan.jfif";
import aadhar from "../assets/images/aadhar.jfif";
import user from "../assets/images/users/user-5.jpg";

// import { AvForm, input } from "availity-reactstrap-validation"
// import qrcode from "../assets/images/qrcode.png";
import Modal from "react-bootstrap/Modal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Bank() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showResults, setShowResults] = React.useState(false);
  const showfield = () => setShowResults(true);
  const hidefield = () => setShowResults(false);

  const [editResults, seteditResults] = React.useState(false);
  const editfield = () => seteditResults(false);

  const [showResults2, setShowResults2] = React.useState(false);
  const hidefield2 = () => setShowResults2(false);
  const [editResults2, seteditResults2] = React.useState(false);
  const editfield2 = () => seteditResults2(false);

  const [bank, setbank] = React.useState(true);
  console.log(bank);
  const [upi, setupi] = React.useState(false);

  const [bankss, setbankss] = useState([]);
  console.log(bankss);
  const [form, setform] = useState([]);

  const banks = () => {
    var token = sessionStorage.getItem("token");
    // var _id = sessionStorage.getItem("UserId");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/bank/getall-activebanks",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          setbankss(res.data.actBanks);
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
    banks();
    mybank();
  }, []);

  const Optionchange = (e) => {
    let myUser = { ...form };
    myUser.bankId = e.target.value;
    setform(myUser);
  };

  const [Files, setFiles] = useState("");
  const [Files1, setFiles1] = useState("");
  const [Files2, setFiles2] = useState("");
  const [Files3, setFiles3] = useState("");

  const changeHandler = (e) => {
    setFiles(e.target.files);
  };

  const changeHandler1 = (e) => {
    setFiles1(e.target.files);
  };
  const changeHandler2 = (e) => {
    setFiles2(e.target.files);
  };

  const changeHandler3 = (e) => {
    setFiles3(e.target.files);
  };

  const add = () => {
    const dataArray = new FormData();
    dataArray.append("bankId", form.bankId);
    dataArray.append("accountType", form.accountType);
    dataArray.append("accountHolderName", form.accountHolderName);
    dataArray.append("accountNumber", form.accountNumber);
    dataArray.append("ifscCode", form.ifscCode);
    dataArray.append("pancardNumber", form.pancardNumber);
    dataArray.append("aadhaarcardNumber", form.aadhaarcardNumber);

    for (let i = 0; i < Files.length; i++) {
      dataArray.append("passbookcopy", Files[i]);
    }

    for (let i = 0; i < Files1.length; i++) {
      dataArray.append("passportImg", Files1[i]);
    }
    for (let i = 0; i < Files2.length; i++) {
      dataArray.append("aadhaarImg", Files2[i]);
    }
    for (let i = 0; i < Files3.length; i++) {
      dataArray.append("panImg", Files3[i]);
    }

    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/bankkyc/addkyc",
        dataArray,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          if (res.status === 200) {
            toast(res.data.message);
            mybank();
            setShowResults(!showResults);
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

  const handleChange = (e) => {
    let myUser = { ...form };
    myUser[e.target.name] = e.target.value;
    setform(myUser);
  };

  const handleSubmit = (e) => {
    add();
    e.preventDefault();
  };

  const [user, setuser] = useState([]);
  console.log(user)

  const mybank = () => {
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/bankkyc/getkyc",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          setuser(res.data.kycResult);
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

  const Optionchange1 = (e) => {
    let myUser = { ...user };
    myUser.bankId = e.target.value;
    setuser(myUser);
  };

  const handleChange1 = (e) => {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setuser(myUser);
  };

  const [Files4, setFiles4] = useState("");
  const [Files5, setFiles5] = useState("");
  const [Files6, setFiles6] = useState("");
  const [Files7, setFiles7] = useState("");

  const changeHandler4 = (e) => {
    setFiles4(e.target.files);
  };

  const changeHandler5 = (e) => {
    setFiles5(e.target.files);
  };
  const changeHandler6 = (e) => {
    setFiles6(e.target.files);
  };

  const changeHandler7 = (e) => {
    setFiles7(e.target.files);
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
    updateCategory();
  };

  const updateCategory = () => {
    const data1 = user._id;
    const dataArray = new FormData();
    dataArray.append("bankId", user.bankId);
    dataArray.append("accountType", user.accountType);
    dataArray.append("accountHolderName", user.accountHolderName);
    dataArray.append("accountNumber", user.accountNumber);
    dataArray.append("ifscCode", user.ifscCode);
    dataArray.append("pancardNumber", user.pancardNumber);
    dataArray.append("aadhaarcardNumber", user.aadhaarcardNumber);

    for (let i = 0; i < Files4.length; i++) {
      dataArray.append("passbookcopy", Files4[i]);
    }

    for (let i = 0; i < Files5.length; i++) {
      dataArray.append("passportImg", Files5[i]);
    }
    for (let i = 0; i < Files6.length; i++) {
      dataArray.append("aadhaarImg", Files6[i]);
    }
    for (let i = 0; i < Files7.length; i++) {
      dataArray.append("panImg", Files7[i]);
    }
    var token = sessionStorage.getItem("token");
    axios
      .put(
        "https://aquinapi.aquin.us/api/v1/web/bankkyc/editkyc" + "/" + data1,
        dataArray,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          if (res.status === 200) {
            toast(res.data.message);
            seteditResults(!editResults);
            mybank();
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
              <h5>Bank Details</h5>
              <span style={{ fontSize: " 15px" }}>
                <Link to="/Dashboard">Aquin</Link>{" "}
                <i class="fa fa-angle-double-right" aria-hidden="true"></i> Bank
                Details
              </span>
            </div>
            {showResults ? (
              <Card>
                
                <CardBody>
                {/* <center style={{ padding: "30px" }}>
                  {" "}
                  <h6>No Data Found</h6>
                </center> */}
                  <CardTitle className="h4">Add Bank Details </CardTitle>
                  <div className="mt-4">
                    <div className="needs-validation">
                      <form
                        method="post"
                        onSubmit={(e) => {
                          handleSubmit(e);
                        }}
                      >
                        <Row>
                          <Col md="3">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom01">Bank</Label>
                              <select
                                errorMessage=" Please provide a valid State"
                                id="validationCustom03"
                                className="form-control"
                                required
                                name="bankId"
                                onChange={(e) => {
                                  Optionchange(e);
                                }}
                                value={form.bankId}
                              >
                                <option value="">select bank Name </option>
                                {bankss.map((opt) => {
                                  return (
                                    <option value={opt._id}>{opt.title}</option>
                                  );
                                })}
                              </select>
                            </div>
                          </Col>
                          <Col md="3">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom07">
                                AccountType
                              </Label>
                              <select
                                errorMessage=" Please provide a valid State"
                                id="validationCustom03"
                                className="form-control"
                                required
                                name="accountType"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                value={form.accountType}
                              >
                                <option value="">Select Account Type</option>
                                <option value="savingsAccount">
                                  Savings Account{" "}
                                </option>
                                <option value="currentAccount">
                                  Current Account
                                </option>
                                <option value="salaryAccount">
                                Salary Account
                                </option>
                              </select>
                            </div>
                          </Col>
                          <Col md="3">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom07">
                                Account Name
                              </Label>
                              <input
                                placeholder="Account Name"
                                type="text"
                                errorMessage="Account Name"
                                className="form-control"
                                id="validationCustom07"
                                value={form.accountHolderName}
                                name="accountHolderName"
                                required
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              />
                            </div>
                          </Col>
                          <Col md="3">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom01">
                                Account Number
                              </Label>
                              <input
                                value={form.accountNumber}
                                name="accountNumber"
                                required
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                placeholder="Account Number"
                                type="number"
                                errorMessage="Account Number"
                                className="form-control"
                                id="validationCustom01"
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="3">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom07">
                                IFSC Code
                              </Label>
                              <input
                                value={form.ifscCode}
                                name="ifscCode"
                                required
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                placeholder="IFSC Code"
                                type="text"
                                className="form-control"
                              />
                            </div>
                          </Col>
                          <Col md="3">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom01">
                                Bank Book Image
                              </Label>
                              <input
                                type="file"
                                errorMessage="Bank Book"
                                className="form-control"
                                id="validationCustom01"
                                onChange={changeHandler}
                              />
                            </div>
                          </Col>
                          <Col md="3">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom07">
                                Passphoto
                              </Label>
                              <input
                                type="file"
                                errorMessage="Passphoto"
                                className="form-control"
                                id="validationCustom07"
                                onChange={changeHandler1}
                              />
                            </div>
                          </Col>
                          <Col md="3">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom07">
                                Aadhar Card No
                              </Label>
                              <input
                                placeholder="AadharNo"
                                type="number"
                                errorMessage="Aadhar Card No"
                                className="form-control"
                                id="validationCustom07"
                                value={form.aadhaarcardNumber}
                                name="aadhaarcardNumber"
                                required
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col md="3">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom07">
                                Aadhar Card Image
                              </Label>
                              <input
                                name="image"
                                type="file"
                                errorMessage="Aadhar Card Image/Pdf"
                                className="form-control"
                                id="validationCustom07"
                                onChange={changeHandler2}
                              />
                            </div>
                          </Col>
                          <Col md="3">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom07">
                                Pan Card No
                              </Label>
                              <input
                                name="pancardNumber"
                                placeholder="Pan Card No"
                                type="text"
                                className="form-control"
                                value={form.pancardNumber}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              />
                            </div>
                          </Col>
                          <Col md="3">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom07">
                                Pan Card Image
                              </Label>
                              <input
                                type="file"
                                name="image"
                                multiple
                                className="form-control"
                                onChange={changeHandler3}
                              />
                            </div>
                          </Col>
                          <Col md="4">
                            <div className="mb-4 mt-4">
                              <Button
                                type="submit"
                                className="btn btn-success listbtns"
                                style={{ width: "110px" }}
                              >
                                Submit
                              </Button>
                              <Button
                                className="btn-danger listbtns"
                                style={{ width: "110px" }}
                                onClick={hidefield}
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
            {editResults ? (
              <Card>
                <CardBody>
                  <CardTitle className="h4">Edit Bank Details </CardTitle>
                  <div className="mt-4">
                    <div className="needs-validation">
                      <form
                        method="post"
                        onSubmit={(e) => {
                          handleSubmit1(e);
                        }}
                      >
                        <Row>
                          <Col md="3">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom01">
                                Bank Name
                              </Label>
                              <select
                                errorMessage=" Please provide a valid State"
                                id="validationCustom03"
                                className="form-control"
                                required
                                name="bankId"
                                onChange={(e) => {
                                  Optionchange1(e);
                                }}
                                value={user.bankId}
                              >
                                <option value="">select bank Name </option>
                                {bankss.map((opt) => {
                                  return (
                                    <option value={opt._id}>{opt.title}</option>
                                  );
                                })}
                              </select>
                            </div>
                          </Col>

                          <Col md="3">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom07">
                                AccountType
                              </Label>
                              <select
                                errorMessage=" Please provide a valid State"
                                id="validationCustom03"
                                className="form-control"
                                required
                                name="accountType"
                                onChange={(e) => {
                                  handleChange1(e);
                                }}
                                value={user.accountType}
                              >
                                <option value="">Select Account Type</option>
                                <option value="savingsAccount">
                                  Savings Account{" "}
                                </option>
                                <option value="currentAccount">
                                  Current Account
                                </option>
                                <option value="salaryAccount">
                                Salary Account
                                </option>
                              </select>
                            </div>
                          </Col>

                          <Col md="3">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom07">
                                Account Name
                              </Label>
                              <input
                                placeholder="Account Name"
                                type="text"
                                className="form-control"
                                value={user.accountHolderName}
                                name="accountHolderName"
                                required
                                onChange={(e) => {
                                  handleChange1(e);
                                }}
                              />
                            </div>
                          </Col>

                          <Col md="3">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom01">
                                Account Number
                              </Label>
                              <input
                                placeholder="Account Number"
                                type="number"
                                errorMessage="Account Number"
                                className="form-control"
                                value={user.accountNumber}
                                name="accountNumber"
                                required
                                onChange={(e) => {
                                  handleChange1(e);
                                }}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="3">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom07">
                                IFSC Code
                              </Label>
                              <input
                                type="text"
                                className="form-control"
                                value={user.ifscCode}
                                name="ifscCode"
                                required
                                onChange={(e) => {
                                  handleChange1(e);
                                }}
                              />
                            </div>
                          </Col>

                          <Col md="3">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom01">
                                Bank Book Image
                              </Label>
                              <input
                                name="image"
                                type="file"
                                multiple
                                className="form-control"
                                onChange={changeHandler4}
                              />
                              {/* <img
                                src={
                                  "https://aquinapi.aquin.us" +
                                  "/" +
                                  user.passbookcopy
                                }
                                height="50"
                                alt="alt"
                              /> */}
                            </div>
                          </Col>
                          <Col md="3">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom07">
                                Passphoto
                              </Label>
                              <input
                                name="image"
                                type="file"
                                multiple
                                className="form-control"
                                onChange={changeHandler5}
                              />
                              {/* <img
                                src={
                                  "https://aquinapi.aquin.us" +
                                  "/" +
                                  user.passportSizeImage
                                }
                                height="50"
                                alt="alt"
                              /> */}
                            </div>
                          </Col>
                          <Col md="3">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom07">
                                Aadhar Card No
                              </Label>
                              <input
                                type="text"
                                className="form-control"
                                value={user.aadhaarcardNumber}
                                name="aadhaarcardNumber"
                                required
                                onChange={(e) => {
                                  handleChange1(e);
                                }}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="3">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom07">
                                Aadhar Card
                              </Label>
                              <input
                                name="image"
                                type="file"
                                multiple
                                className="form-control"
                                onChange={changeHandler6}
                              />
                              {/* <img
                                src={
                                  "https://aquinapi.aquin.us" +
                                  "/" +
                                  user.pancardImage
                                }
                                height="50"
                                alt="alt"
                              /> */}
                            </div>
                          </Col>
                          <Col md="3">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom07">
                                Pan Card No
                              </Label>
                              <input
                                type="text"
                                className="form-control"
                                value={user.pancardNumber}
                                name="pancardNumber"
                                required
                                onChange={(e) => {
                                  handleChange1(e);
                                }}
                              />
                            </div>
                          </Col>
                          <Col md="3">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom07">
                                Pan Card
                              </Label>
                              <input
                                name="image"
                                type="file"
                                multiple
                                className="form-control"
                                onChange={changeHandler7}
                              />
                              {/* <img
                                src={
                                  "https://aquinapi.aquin.us" +
                                  "/" +
                                  user.pancardImage
                                }
                                height="50"
                                alt="alt"
                              /> */}
                            </div>
                          </Col>
                          <Col md="4">
                            <div className="mb-4 mt-4">
                              <Button
                                className="btn btn-success listbtns"
                                style={{ width: "110px" }}
                              >
                                Submit
                              </Button>
                              <Button
                                className="btn-danger listbtns"
                                style={{ width: "110px" }}
                                onClick={editfield}
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
              <CardBody>
                {/* <CardTitle className="h4">Bank Details </CardTitle> */}
                {user == null ?(
                  <div style={{ float: "right" }}>
                    {/* <button className="btn btn-success listbtns"><i class="fa fa-file-pdf" aria-hidden="true"></i> PDF</button>
                 <button className="btn btn-danger listbtns"><i class="fa fa-file-excel" aria-hidden="true"></i> Excel</button> */}
                    <button
                      className="btn btn-primary"
                      style={{ margin: "6px" }}
                      onClick={() => {
                        setShowResults(!showResults);
                      }}
                    >
                      <i class="fa fa-plus-circle" aria-hidden="true">
                        {" "}
                      </i>{" "}
                      Add Bank
                    </button>

                  
                  </div>
                ) : (
                  <>
                    <h6>Bank Details</h6>
                    <div style={{float:"right"}}>
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        seteditResults(!editResults);
                      }}
                    >
                      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>{" "}
                      Edit Bank
                    </button>
                    </div>
                    {bank ? (
                      <div className=" bankstyle mb-4">
                        <div className="table-responsive">
                          <Table className="table-bordered border-primary mb-0">
                            <tbody>
                              <tr>
                                <th scope="row">Bank :</th>
                                <td>{user.bankName}</td>
                              </tr>
                              <tr>
                                <th scope="row">Account Name :</th>
                                <td>{user.accountHolderName}</td>
                              </tr>
                              <tr>
                                <th scope="row">Account Number :</th>
                                <td>{user.accountNumber}</td>
                              </tr>
                              <tr>
                                <th scope="row">IFSC Code :</th>
                                <td>{user.ifscCode}</td>
                              </tr>

                              <tr>
                                <th scope="row">PassBook copy:</th>
                                <td>
                                  {" "}
                                  <img
                                    src={
                                      "https://aquinapi.aquin.us" +
                                      "/" +
                                      user.passCheckbookCopy
                                    }
                                    height="50"
                                    alt="alt"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Pan Card No :</th>
                                <td>{user.pancardNumber}</td>
                              </tr>
                              <tr>
                                <th scope="row">Pan Card Image :</th>
                                <td>
                                  <img
                                    src={
                                      "https://aquinapi.aquin.us" +
                                      "/" +
                                      user.pancardImage
                                    }
                                    height="50"
                                    alt="alt"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Aadhar Card No :</th>
                                <td>{user.aadhaarcardNumber}</td>
                              </tr>
                              <tr>
                                <th scope="row">Aadhar Image:</th>
                                <td>
                                  <img
                                    src={
                                      "https://aquinapi.aquin.us" +
                                      "/" +
                                      user.pancardImage
                                    }
                                    height="50"
                                    alt="alt"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Kyc Status :</th>
                                <td>{user.kycStatus}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                )}

                {/* <MDBDataTable className="mt-5" responsive striped bordered data={data} /> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <ToastContainer/>
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
          <img src={qrcode} style={{ width: "100%" }} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Bank;
