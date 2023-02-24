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
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

// import { AvForm, input } from "availity-reactstrap-validation"
import qrcode from "../assets/images/qrcode.png";
import Modal from "react-bootstrap/Modal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Subads =()=> {
  const [modal, setModal] = useState(false);



  const toggle = () => setModal(!modal);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showResults, setShowResults] = React.useState(false);
  const showfield = () => setShowResults(true);
  const hidefield = () => setShowResults(false);

  const [users, setusers] = useState();
  const [users0, setusers0] = useState();
  console.log(users);

//   const catresult = props.users0;
//   console.log(catresult)

// const getSubcatResult = props.users0;
// console.log(getSubcatResult)

  useEffect(() => {
    Ads();
  }, []);

  const Ads = () => {
    var token = sessionStorage.getItem("token");
    const dataid = sessionStorage.getItem("categoryId")
    const params ={
        categoryId :dataid
      }

    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/subcateg/getcatwise-adsubcatgoeries",
        params,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          setusers(res.data.getSubcatResult);
          console.log(res.data)
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

  const navigate = useNavigate();

  const Adds = (data, i) => {
    var token = sessionStorage.getItem("token");
    const params ={
        _id :data._id
    }

    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/subcateg/getsubcateg",
        params,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.status == 200) {
            console.log(res.data.subCategResult);
            navigate("/plan-ads");
            sessionStorage.setItem("subCatId", res.data.subCategResult._id);
        //   setusers0(res.data);
        //   sessionStorage.setItem("adscatid",res.data._id)

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
              <h5>Sub-categories</h5>
              <span style={{ fontSize: " 15px" }}>
                <Link to="/Dashboard">Aquin</Link>{" "}
                <i class="fa fa-angle-double-right" aria-hidden="true"></i>{" "}
                Sub-categories
              </span>
            </div>

            <div style={{ float: "right" }}>
              <Link to="/Advertisements">
                <button
                  style={{
                    width: "100px",
                    background: "black",
                    color: "#fff",
                  }}
                  className="btn btn mb-3"
                >
                  <i class="fa fa-arrow-circle-left" aria-hidden="true"></i>{" "}
                  Back
                </button>
              </Link>
            </div>
            <div>

              <Row style={{ margin: "80px 0px 200px 0px" }}>
                {users?.map((data, i) => {
                  return (
                    <>
                      <Col md="4">
                        <Card>
                          <div style={{ padding: "20px" }}>
                            <h5 className="text-center cardtext">
                              {data.title}
                            </h5>
                            <p className="text-center mt-3">
                            {data.description}
                            </p>
                            <button
                              className="btn btn-dark form-control"
                              onClick={() => {
                                Adds(data, i);
                              }}
                              style={{ background: "black" }}
                            >
                              Click
                            </button>
                          </div>
                        </Card>
                      </Col>
                    </>
                  );
                })}
              </Row>
            </div>
          </Col>
        </Row>
      </Box>
    </div>
  );
}

export default Subads;
