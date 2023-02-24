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
} from "reactstrap";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { NavLink, Link } from "react-router-dom";
import mark from "../assets/images/mark1.jpg";
import avatar from "../assets/images/users/user-1.jpg";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Moment from "react-moment";
import ReactApexChart from "react-apexcharts";

import "../common.css";
import axios from "axios";
import coin from "../assets/images/coin.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Dashboard(props) {
  const navigate = useNavigate();

  const [user, setuser] = useState([]);
  const [user1, setuser1] = useState([]);
  const [user0, setuser0] = useState([]);
  const [user2, setuser2] = useState([]);
  const [user3, setuser3] = useState([]);
  const [user4, setuser4] = useState([]);
  const [user5, setuser5] = useState([]);
  const [user12, setuser12] = useState([]);
  const [user6, setuser6] = useState({ data: [], categories: [] });
  console.log(user6);
  const [user7, setuser7] = useState([]);

  const state = {
    options: {
      colors: ["#28bbe3", "#F0F1F4"],
      chart: {
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          columnWidth: "70%",
        },
      },
      grid: {
        borderColor: "#f8f8fa",
        row: {
          colors: ["transparent", "transparent"],
          opacity: 0.5,
        },
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          formatter: function (val) {
            return val;
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
      fill: {
        opacity: 1,
      },

      legend: {
        show: false,
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
    series: [
      {
        name: "Series A",
        data: [45, 75, 100, 75, 100, 75, 50, 75, 50, 75, 75, 50],
      },
      {
        name: "Series B",
        data: [180, 65, 90, 65, 90, 65, 40, 65, 40, 65, 75, 50],
      },
    ],
  };

  const getCategory = () => {
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/dashboard/get-dashitems",
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          let newadmin = { ...user6 };
          newadmin.data = res.data.showGraph.data;
          newadmin.categories = res.data.showGraph.categories;
          setuser(res.data.myDirect);
          setuser1(res.data.totalCoins);
          setuser2(res.data.todayEarnig);
          setuser3(res.data.showMember);
          setuser4(res.data.showDailyCoinVal);
          setuser5(res.data.showCoinVal);
          setuser12(res.data);
          setuser0(res.data.totalMembers);

          console.log(newadmin.categories);
          setuser6(newadmin);
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

  const states = {
    series: [
      {
        name: "Coin Value",
        data: user6.data,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },

      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: user6.categories,
      },
    },
  };
  const [sponsor, setsponsor] = useState([]);
  console.log(sponsor.user_id);

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
      .then(
        (res) => {
          if (res.status == 200) {
            setsponsor(res.data.memResult);
          }
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

  useEffect(() => {
    getCategory();
    myprofile();
  }, []);

  const id = sponsor.user_id;

  var ids =  sponsor.user_id;

  return (
    <div>
      <Box sx={{ display: "flex" }} className="cardmrg">
        <div className="backgrounimgstyle">
          <Sidebar />
        </div>
        <div className="drawecontent">
          <Sidebarres />
        </div>

        <Row className="continer cotainerstyle mb-5" style={{ width: "100%" }}>
          <Col md={12}>
            <h5>Dashboard</h5>
            {sponsor.status == "approved" ? (
              <>
                <Row>
                  <Col md={3}>
                    <Card
                      className="mini-stat"
                      style={{
                        background: "rgb(78 173 255)",
                        borderRadius: "10px",
                      }}
                    >
                      <CardBody className="card-body mini-stat-img">
                        <div
                          className="mini-stat-icon"
                          style={{ float: "right" }}
                        >
                          <i
                            style={{ color: "#fff", background: "white" }}
                            class="fa fa-cube"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div>
                          <h6 className="mb-3 font-size-16">My Directs</h6>
                          <h6 className="mb-4 text-dark">{user}</h6>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card
                      className="mini-stat"
                      style={{
                        background: "rgb(11 195 161)",
                        borderRadius: "10px",
                      }}
                    >
                      <CardBody className="card-body mini-stat-img">
                        <div
                          className="mini-stat-icon"
                          style={{ float: "right" }}
                        >
                          <i
                            style={{ color: "#fff", background: "white" }}
                            class="fa fa-users"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div className="text-dark">
                          <h6 className="mb-3 font-size-16 text-dark">
                            Total Team
                          </h6>
                          <h6 className="mb-4 text-dark">{user0}</h6>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card
                      className="mini-stat"
                      style={{
                        background: "rgb(15 136 183 / 73%)",
                        borderRadius: "10px",
                      }}
                    >
                      <CardBody className="card-body mini-stat-img">
                        <div
                          className="mini-stat-icon"
                          style={{ float: "right" }}
                        >
                          <i style={{ background: "white" }}>
                            <img src={coin} height="60" alt="" />
                          </i>
                        </div>
                        <div className="text-dark">
                          <h6
                            className=" mb-3 font-size-16 text-dark"
                            style={{ color: "black", fontWeight: "bold" }}
                          >
                            Total Coins
                          </h6>
                          <h6 className="mb-4 text-dark">{user1}</h6>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card
                      className="mini-stat"
                      style={{
                        background: "rgb(199 114 9 / 82%)",
                        borderRadius: "10px",
                      }}
                    >
                      <CardBody className="card-body mini-stat-img">
                        <div
                          className="mini-stat-icon"
                          style={{ float: "right" }}
                        >
                          <i
                            style={{ color: "#fff", background: "white" }}
                            class="fa fa-money"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div className="text-dark">
                          <h6
                            className=" mb-3 font-size-16 text-dark"
                            style={{ color: "black", fontWeight: "bold" }}
                          >
                            Today Earning
                          </h6>
                          <h6 className="mb-4 text-dark">{user2}</h6>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                <Row>
                  <div className="container">
                    <Card>
                      <marquee className="p-2" direction="left">
                        {user12.showCoinVal == null ? (
                          ""
                        ) : (
                          <b className="text-info">
                            Feature coin price is = {user5.futureAmount}
                          </b>
                        )}

                        {/* <Link to="/pay">
                            <button
                              style={{ width: "100px" }}
                              class="btn ml-3 btn-sm btn-outline-primary"
                            >
                              <i class="fa fa-inr" aria-hidden="true"></i> Pay{" "}
                            </button>
                          </Link> */}
                      </marquee>
                    </Card>
                  </div>
                </Row>

                <Row>
                  <Col md="12">
                    <Card>
                      <CardBody>
                        <CardTitle className="h4 mb-4">
                          Daily Coins price
                        </CardTitle>

                        <Row className="text-center mt-4">
                          {/* <div className="col-6">
                            <h5 className="font-size-20">₹56241</h5>
                            <p className="text-muted">Today Coin Price</p>
                          </div>
                          <div className="col-6">
                            <h5 className="font-size-20">₹23651</h5>
                            <p className="text-muted">Feature Coin Price</p>
                          </div> */}
                        </Row>
                        <div dir="ltr">
                          <React.Fragment>
                            <ReactApexChart
                              series={states.series}
                              options={states.options}
                              type="line"
                              height={350}
                            />
                          </React.Fragment>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  {/* <Col md="4">
                    <Card>
                      <CardBody>
                        <h4 className="card-title mb-4">
                          Monthly Coins Earnings
                        </h4>

                        <Row className="text-center mt-4">
                          <Col xs="6">
                            <h5 className="font-size-20">₹ 2548</h5>
                            <p className="text-muted">Today MarketPrice</p>
                          </Col>
                          <Col xs="6">
                            <h5 className="font-size-20">₹ 6985</h5>
                            <p className="text-muted">Feature MarketPrice</p>
                          </Col>
                        </Row>

                        <div
                          id="morris-bar-stacked"
                          className="morris-charts morris-charts-height"
                          dir="ltr"
                        >
                          <ReactApexChart
                            options={state.options}
                            series={state.series}
                            type="bar"
                            height="350"
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </Col> */}
                </Row>

                <Row className="mt-4">
                  <Col xl="4">
                    <Card className="directory-card">
                      <div>
                        <div className="directory-bg text-center">
                          <div className="directory-overlays">
                            {/* <img
                              className="rounded-circle avatar-lg img-thumbnail"
                              style={{ width: "100px" }}
                              src={
                                "https://aquinapi.aquin.us" +
                                "/" +
                                user3.profileImage
                              }
                              alt="Generic placeholder"
                            /> */}
                            <h6 className="text-white">My Profile </h6>
                          </div>
                        </div>

                        <div className="directory-content text-center p-4">
                          <p className="font-size-16 ">
                            Member Id : {user3.user_id}
                          </p>
                          <h5 className="font-size-16">{user3.name}</h5>
                        </div>
                      </div>
                      <div style={{ paddingLeft: "20px" }}>
                        <div className="row">
                          <div className="col">
                            <p>
                              <b>Registration:</b>
                            </p>
                            <p>
                              <b>ID Status:</b>
                            </p>
                          </div>
                          <div className="col">
                            <p>
                              <b>
                                <Moment format="DD-MM-YYYY">
                                  {user3.createdAt}
                                </Moment>
                              </b>
                            </p>
                            <p>
                              <b> {user3.status}</b>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>

                  <Col xl="4">
                    <Card className="directory-card">
                      <div>
                        <div className="directory-bg text-center">
                          <div className="directory-overlays">
                            <h6 className="text-white">Today coin price</h6>
                          </div>
                        </div>

                        <div className="directory-content text-center p-4">
                          <p>
                            This is Today our basic coin values or coin price
                          </p>
                          {user12.showCoinVal == null ? (
                          ""
                        ) : (
                          <h5 style={{ fontSize: "30px" }} className="mt-3">
                            
                            {user5.numberOfCoin}
                            <img src={coin} height="50" alt="" /> ={" "}
                            <i class="fa fa-inr" aria-hidden="true"></i>{" "}
                            {user5.amount}
                          </h5>
                        )}

                          
                        </div>
                      </div>
                    </Card>
                  </Col>

                  <Col xl="4">
                    <Card className="directory-card mb-5">
                      <div>
                        <div className="directory-bg text-center">
                          <div className="directory-overlays">
                            <h6 className="text-white">
                              Share your Referral Link
                            </h6>
                          </div>
                        </div>

                        <div className="directory-content text-center p-4">
                          <h6 className="font-size-16">
                          http://login.aquin.us/register/{ids}
                          </h6>
                        </div>
                        <div
                          className="directory-content text-center p-2"
                          style={{ background: "#e1e1e1" }}
                        >
                          <Button
                            className="btn-info mb-3 mt-2"
                            target="_blank"
                            href={"https://www.addtoany.com/share#url=http%3A%2F%2Flogin.aquin.us%2Fregister%2F" + id}
                            // href={
                            //   "https://www.addtoany.com/share#url=http%3A%2F%2Faquin.us%2Fregister"
                            // }
                            // href="http://web.whatsapp.com/send?text=http://ctmember.mlmconsultancy.co.in/?100001"
                            style={{ margin: "5px" }}
                          >
                            Share{" "}
                            <i
                              class="fa fa-share-square-o"
                              aria-hidden="true"
                            ></i>{" "}
                          </Button>

                          {/* <Button
                        className="btn-success"
                        target="_blank"
                        href="http://web.whatsapp.com/send?text=http://ctmember.mlmconsultancy.co.in/?100001"
                        style={{ margin: "5px" }}
                      >
                        <i class="fa fa-whatsapp" aria-hidden="true"></i>{" "}
                        WhatsApp
                      </Button>
                      <Button
                        className="btn-info "
                        target="_blank"
                        href="https://www.facebook.com/send?text=http://ctmember.mlmconsultancy.co.in/?100001"
                      >
                        <i class="fa fa-facebook" aria-hidden="true"></i>{" "}
                        Facebook
                      </Button> */}
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </>
            ) : (
              <Row className="mt-3">
                {sponsor.status == "pending" ? (
                  <div className="container">
                    <Card style={{ width: "100%" }}>
                      <div className="p-2">
                        <marquee direction="left">
                          <b className="text-warning">
                            Your payment is not approved please wait untill we
                            approve your payment.
                          </b>
                          {/* <Link to="/pay">
                            <button
                              style={{ width: "100px" }}
                              class="btn ml-3 btn-sm btn-outline-primary"
                            >
                              <i class="fa fa-inr" aria-hidden="true"></i> Pay{" "}
                            </button>
                          </Link> */}
                        </marquee>
                      </div>
                    </Card>
                  </div>
                ) : (
                  <div className="container">
                    <Card style={{ width: "100%" }}>
                      <div className="p-2">
                        <marquee direction="left">
                          <b className="text-danger">
                            Your account is not verified please make the payment
                          </b>
                          <Link to="/pay">
                            <button
                              style={{ width: "100px" }}
                              class="btn ml-3 btn-sm btn-outline-primary"
                            >
                              <i class="fa fa-inr" aria-hidden="true"></i> Pay{" "}
                            </button>
                          </Link>
                        </marquee>
                      </div>
                    </Card>
                  </div>
                )}
              </Row>
            )}
          </Col>
        </Row>
        <ToastContainer />
      </Box>
    </div>
  );
}

export default Dashboard;
