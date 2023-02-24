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
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

// import { AvForm, input } from "availity-reactstrap-validation"
import qrcode from "../assets/images/qrcode.png";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Levelwise() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showResults, setShowResults] = React.useState(false);
  const showfield = () => setShowResults(true);
  const hidefield = () => setShowResults(false);

  const exportPDF = () => {
    const pdfTable = document.getElementById("dataList");
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(documentDefinition).open();
  };

  const [member, setmember] = useState([]);
  console.log(member);

  const [form, setform] = useState([]);
  console.log(form);

  const handleChange = (e) => {
    let myUser = { ...form };
    myUser[e.target.name] = e.target.value;
    setform(myUser);
  };

  const Levelwisemem = () => {
    var token = sessionStorage.getItem("token");
    var _id = sessionStorage.getItem("UserId");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/member/get-levelwisemembers",
        { _id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          setmember(res.data.memResult);
          console.log(res.data);
        }
      },
      (error) => {
        if (error.response && error.response.status === 400) {
          toast(error.response.data.message);
        }else if (error.response && error.response.status === 401){
          toast(error.response.data.message);
          navigate("/login");
        }
      }
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Levelwisememfilt();
  };

  const Levelwisememfilt = () => {
    var token = sessionStorage.getItem("token");
    var _id = sessionStorage.getItem("UserId");
    const filtdata = {
      level: form.level,
      _id:_id,
    };
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/member/get-levelwisemembers",
        filtdata,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          hidefield();
           setmember(res.data.memResult);
          // console.log(res.data);
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
    Levelwisemem();
    // mybank();
  }, []);

  const [search, setsearch] = useState("");
  const [listPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);

  const pagesVisited = pageNumber * listPerPage;
  const lists = member.slice(pagesVisited, pagesVisited + listPerPage);
  const pageCount = Math.ceil(member.length / listPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
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
        {/* <CssBaseline /> */}
        <Row className="continer cotainerstyle mb-5" style={{ width: "100%" }}>
          <Col md={12}>
            <div className="mb-4">
              <h5>Level wise Team Members</h5>
              <span style={{ fontSize: " 15px" }}>
                <Link to="/Dashboard">Aquin</Link>{" "}
                <i class="fa fa-angle-double-right" aria-hidden="true"></i>{" "}
                Level wise Team
              </span>
            </div>

            {showResults ? (
              <Card>
                <CardBody>
                  <div>
                    <div className="needs-validation">
                      <form
                        onSubmit={(e) => {
                          handleSubmit(e);
                        }}
                      >
                        <Row>
                          {/* <Col md="3">
                          <div className="mb-4">
                            <Label htmlFor="validationCustom01">
                              From Date
                            </Label>
                            <input
                              name="FromDate"
                              placeholder="From Date"
                              type="date"
                              errorMessage="From Date"
                              className="form-control"
                              validate={{ required: { value: true } }}
                              id="validationCustom01"
                            />
                          </div>
                        </Col>
                        <Col md="3">
                          <div className="mb-4">
                            <Label htmlFor="validationCustom01">To Date</Label>
                            <input
                              name="To Date"
                              placeholder="To Date"
                              type="date"
                              errorMessage="To Date"
                              className="form-control"
                              validate={{ required: { value: true } }}
                              id="validationCustom07"
                            />
                          </div>
                        </Col> */}
                          <Col md="4">
                            <div className="mb-4">
                              <Label htmlFor="validationCustom02">
                                Level No
                              </Label>
                              <select
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                name="level"
                                className="form-control"
                              >
                                <option value="All">All</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                              </select>
                            </div>
                          </Col>
                          <Col md="4">
                            <div className="mb-4 mt-4">
                              <Button className="btn btn-success listbtns">
                                Submit
                              </Button>
                              <Button
                                className="btn-danger listbtns"
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
            <Card>
            {member.length >= 1 ? ( 
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
                  <div className="form-group">
                    <button
                      onClick={exportPDF}
                      className="btn btn-danger listbtns"
                    >
                      <i class="fa fa-file-pdf-o" aria-hidden="true"></i> PDF
                    </button>
                    {/* <button className="btn btn-success listbtns"><i class="fa fa-file-excel-o" aria-hidden="true"></i> Excel</button> */}
                    <span>
                      <ReactHTMLTableToExcel
                       className="btn btn-success m-2"
                       table="empTable"
                       filename="ReportExcel"
                       sheet="Sheet"
                       buttonText="Excel"
                       style={{ color: "white" }}
                      />
                      {/* <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="btn btn-success"
                        table="dataList"
                        filename="dataList"
                        sheet="dataList"
                        buttonText="Excel" /> */}
                    </span>
                    <button
                      className="btn btn-primary listbtns"
                      onClick={() => {
                        setShowResults(!showResults);
                      }}
                    >
                      <i class="fa fa-filter" aria-hidden="true"></i> Filter
                    </button>
                  </div>
                </div>

                <div style={{ float: "right", marginTop: "7px" }}>
                  <input
                    type="search"
                    className="form-control mb-3 membtnstyle"
                    placeholder="Search..."
                    style={{ width: "250px" }}
                  />
                </div>
                <div className="table-responsive">
                  {/* <h5>Level Wise Member</h5> */}
                  <div id="dataList">
                    <div className="table-responsive">
                      <Table id="empTable" striped bordered hover size="lg">
                        <thead>
                          <tr>
                            <th>SNo</th>
                            <th>Member Id</th>
                            <th>Member</th>
                            <th>Sponsor Code</th>
                            <th>Sponsor Name</th>
                            <th>D O J </th>
                            <th>Level</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lists
                            // .filter((value) => {
                            //   if (search === !null) {
                            //     return value;
                            //   } else if (
                            //     value.memberName
                            //       .toLowerCase()
                            //       .includes(search.toLowerCase())
                            //   ) {
                            //     return value;
                            //   }
                            // })
                            .map((data, i) => {
                              return (
                                <tr key={i}>
                                  <td>{i + 1}</td>
                                  <td>{data.memberUser_id}</td>
                                  <td>{data.memberName}</td>
                                  <td>{data.othermemberSponsorId}</td>
                                  <td>{data.othermemberSponsorName}</td>
                                  <td>{data.updatedAt}</td>
                                  <td>{data.levelofMember}</td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </Table>
                    </div>
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
                </div>
              </div>
               ) : (
                <center style={{ padding: "30px" }}>
                  {" "}
                  <h6>No Data Found</h6>
                </center>
              )}
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

export default Levelwise;
