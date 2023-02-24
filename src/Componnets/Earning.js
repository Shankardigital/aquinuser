import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Sidebarres from "./Sidebarres";
import { Row, Col, Card } from "reactstrap";
import Table from "react-bootstrap/Table";
import Box from "@mui/material/Box";
import { NavLink, Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import qrcode from "../assets/images/qrcode.png";
import Modal from "react-bootstrap/Modal";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Moment from "react-moment";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Earning() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [user, setuser] = useState([]);
  console.log(user);

  const getCategory = () => {
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/earning/getuserearning",
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setuser(res.data.earningResult);
        console.log(res.data.earningResult)
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
              <h5>Earning</h5>
              <span style={{ fontSize: " 15px" }}>
                <Link to="/Dashboard">Aquin</Link>{" "}
                <i class="fa fa-angle-double-right" aria-hidden="true"></i>{" "}
                Earning
              </span>
            </div>
            <Card>
            {user.length >= 1 ? ( 
              <div style={{ padding: "30px" }}>
               
                <div style={{ float: "right" }}>
                  <input
                    type="search"
                    className="form-control mb-3"
                    placeholder="Search..."
                    style={{ width: "200px" }}
                    onChange={(e) => {
                      setsearch(e.target.value);
                    }}
                  />
                </div>
                <h5>Earning List</h5>
                <div className="table-responsive">
                  <Table striped bordered hover size="lg">
                    <thead>
                      <tr>
                        <th>SNo</th>
                        <th>User Name</th>
                        <th>User Id</th>
                        <th>Coins</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user
                      .filter((value) => {
                        if (search === !null) {
                          return value;
                        } else if (
                          value.userName
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
                            <td>{data.userName}</td>
                            <td>{data.userRefid}</td>
                            <td>{data.coins}</td>
                            <td>
                              <Moment format="DD-MM-YYYY">
                                {data.earningDate}
                              </Moment>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
                <div style={{ float: "right" }} className="mt-2">
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

export default Earning;
