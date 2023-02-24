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
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Ticket() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showResults, setShowResults] = React.useState(false);
  const showfield = () => setShowResults(true);
  const hidefield = () => setShowResults(false);

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

  const add = () => {
    const dataArray = new FormData();
    dataArray.append("title", form.title);
    dataArray.append("description", form.description);
    for (let i = 0; i < Files.length; i++) {
      dataArray.append("supportImg", Files[i]);
    }
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/support/request-support",
        dataArray,
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
            getCategory()
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
      title: "",
      description: "",
    });
  };

  const [user, setuser] = useState([]);
  console.log(user);

  const getCategory = () => {
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/support/getall-usersupport",
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setuser(res.data.ticketResult);
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
    getCategory();
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
        <Row className="continer cotainerstyle mb-5" style={{ width: "100%" }}>
          <Col md={12}>
            <div className="mb-4">
              <h5>Ticket Raise</h5>
              <span style={{ fontSize: " 15px" }}>
                <Link to="/Dashboard">Aquin</Link>{" "}
                <i class="fa fa-angle-double-right" aria-hidden="true"></i>{" "}
                Ticket Raise
              </span>
            </div>

            {showResults ? (
              <Card>
                <CardBody>
                  <form
                    method="post"
                    onSubmit={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    <div>
                      <div className="needs-validation">
                        <Row>
                          <Col md="4">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom01">
                                Title <span className="text-danger">*</span>
                              </Label>
                              <input
                                placeholder="Enter Title"
                                type="text"
                                errorMessage="Enter Title"
                                className="form-control"
                                required
                                name="title"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                value={form.title}
                                id="validationCustom07"
                              />
                            </div>
                          </Col>
                          <Col md="4">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom01">
                                Image <span className="text-danger">*</span>
                              </Label>
                              <input
                                type="file"
                                className="form-control"
                                name="image"
                                multiple
                                onChange={changeHandler}
                                required
                              />
                            </div>
                          </Col>
                          <Col md="4">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom01">
                                Desecription{" "}
                                <span className="text-danger">*</span>
                              </Label>
                              <textarea
                                placeholder="Enter Desecription"
                                type="text"
                                errorMessage="Enter Desecription"
                                className="form-control"
                                required
                                name="description"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                value={form.description}
                                id="validationCustom07"
                              />
                            </div>
                          </Col>
                        </Row>
                        <div className="mb-2 mt-2" style={{ float: "right" }}>
                          <Button
                            className="btn btn-success listbtns"
                            type="submit"
                            style={{ width: "100px" }}
                          >
                            Submit
                          </Button>
                          <Button
                            className="btn-danger listbtns"
                            style={{ width: "100px" }}
                            onClick={hidefield}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </CardBody>
              </Card>
            ) : (
              ""
            )}

            <Card>
              <div style={{ padding: "30px" }}>
                {/* <div>
                <p>Show entries</p>
                  <select >
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                  </select>
              </div> */}
                <div style={{ float: "right" }}>
                  <div class="form-inline my-2 my-lg-0">
                    <button
                      className="btn btn-outline-primary my-2 my-sm-0 adgustwidth"
                      onClick={() => {
                        setShowResults(!showResults);
                      }}
                    >
                      <i class="fa fa-ticket" aria-hidden="true"></i> Ticket
                      Raise{" "}
                    </button>
                    <input
                      type="search"
                      className="form-control mb-3 mt-3 ml-3 adgustwidth "
                      placeholder="Search..."
                      style={{ width: "200px" }}
                    />
                  </div>
                </div>
                <h6>Ticket Raise</h6>
                {user.length >= 1 ? ( 
                <div className="table-responsive">
                  <Table striped bordered hover size="lg">
                    <thead>
                      <tr>
                        <th>SNo</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Desecription</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.map((data, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{data.title}</td>
                            <td>
                              {" "}
                              <img
                                src={
                                  "https://aquinapi.aquin.us" +
                                  "/" +
                                  data.image
                                }
                                style={{
                                  width: "100px",
                                  cursor: "pointer",
                                }}
                              ></img>
                            </td>
                            <td>{data.description}</td>
                            <td>
                              {data.supportStatus}
                              {/* {data.supportStatus === true ||
                                      data.status == "true"
                                        ? "pending"
                                        : "Resolved"} */}
                                        </td>
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

export default Ticket;
