import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Sidebarres from "./Sidebarres";
import {
  Row,
  Col,
  Card,
  CardBody,

} from "reactstrap";

import Box from "@mui/material/Box";
import { NavLink, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

function PlanAds() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showResults, setShowResults] = React.useState(false);
  const showfield = () => setShowResults(true);
  const hidefield = () => setShowResults(false);



  const [users, setusers] = useState([]);


  const location = useLocation();
  // console.log(location.state.categoryId);


  const Ads = () => {
    var token = sessionStorage.getItem("token");
    const adsid = sessionStorage.getItem("subCatId")
  const params ={
    subCategoryId: adsid
  }

    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/Advertise/getall-subcategAds",
        params,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          setusers(res.data.Adsresult);
          console.log(res.data.Adsresult)
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
    Ads();
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
              <h5>Plan Ads</h5>
              <span style={{ fontSize: " 15px" }}>
                <Link to="/Dashboard">Aquin</Link>{" "}
                <i class="fa fa-angle-double-right" aria-hidden="true"></i> Plan
                Ads
              </span>
            </div>

            <div style={{ float: "right" }}>
              <Link to="/sub-ads">
                <button
                  style={{
                    width: "100px",
                    background: "#1babd7",
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
              {/* <Row style={{ margin: "80px 0px 0px 0px" }}>
                <Col md="4">
                  <Card>
                    <CardBody>
                      <div className="embed-responsive embed-responsive-16by9 ratio ratio-16x9">
                       <div >
                       <iframe
                          src="https://www.youtube.com/embed/M7mBXdZnKT8"
                          title="( తెలుగు ) మొదటి  kibho crypto సమావేశాల్లో  CEO రమేష్  గారు. (VZM)"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        ></iframe>
                       </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row> */}
                <Row style={{ margin: "80px 0px 200px 0px" }}>
                {users?.map((data, i) => {
                  return (
                    <>
                      <Col md="4">
                        <Card>
                        <iframe
                          src={
                            "https://www.youtube.com/embed/" +
                            data.youtubeLink.split("=")[1]
                          }
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        ></iframe>
                        </Card>
                      </Col>
                    </>
                  );
                })}
              </Row>
            </div>
          </Col>
        </Row>
        <ToastContainer/>
      </Box>
    </div>
  );
}

export default PlanAds;
