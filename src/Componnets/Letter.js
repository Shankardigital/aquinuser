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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Letter() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const [sponsor, setsponsor] = useState([]);
  console.log(sponsor.name)

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
          navigate("/login");
        }
      }
      );
  };

  useEffect(() => {
    myprofile();
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
        <Row
          className="continer cotainerstyle2 mb-5"
          style={{ width: "100%" }}
        >
          <Col md={12}>
            <div className="mb-4">
              <h5>Welcome letter</h5>
              <span style={{ fontSize: " 15px" }}>
                <Link to="/Dashboard">Aquin</Link>{" "}
                <i class="fa fa-angle-double-right" aria-hidden="true"></i>{" "}
                Welcome letter
              </span>
            </div>
            <Card>
            <div style={{padding:"50px"}}>
            <div>
                <h5 className="text-center mt-3 welfont">WELCOME TO AQUIN</h5>
              </div>
              <div>
                <p className="mt-5 welfont">Subject: Congratulations</p>
                <p className="welfont">Dear  {sponsor.name},</p>
                <p className="welfont">
                  Congratulations on your remarkable achievement! You have done
                  such a great job on developing<b> a new project plan in AQUIN </b> 
                  Your diligence, commitment and extra time you've been putting
                  in on this has really paid off, and I believe that you have
                  presented an ambitious and attainable set of goals for your
                  team and the company.
                </p>
                <p className="welfont">
                  This is just the beginning of your bright and blooming future
                  and you are set to conquer the world with your intelligence.
                  You have delighted us with you results and we wish you all the
                  best for your future.
                </p>
                <p className="welfont">
                We are sure that we will hear many more great deals about your success. Keep up the great work!
                </p>
              </div>

              <div>
                <p className="mt-5 welfont">Sincerely,</p>
                <h5 className="welfont">AQUIN</h5>
              </div>
            </div>

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

export default Letter;
