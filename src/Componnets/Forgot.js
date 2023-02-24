import React, { useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Label } from "reactstrap";
import { Link,useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Forgot() {
    const [user, setUser] = useState({ email: ""});

  const handleChange = (e) => {
    let newadmin = { ...user };
    newadmin[e.target.name] = e.target.value;
    setUser(newadmin);
  };
  const navigate = useNavigate();

  const usersign = (e) => {
    e.preventDefault();
    signin();
  };

  const signin = () => {
    const dataArray = new FormData()
    dataArray.append("email", user.email)
    axios
      .post("https://aquinapi.aquin.us/api/v1/web/aquin/sendotp", dataArray)
      .then(
        (res) => {
          
          toast(res.data.message);
        console.log(res.data.userinfo)  
        // sessionStorage.setItem("Email",res.data.userinfo.email);
        sessionStorage.setItem("ids",res.data.userinfo.id);
       
        //   localStorage.setItem("")
          navigate("/otp");
        },
        (error) => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message);
          }
        }
      );
  };
  return (
    <div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
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

                  <div className="p-3">
                    <h4 className="text-muted font-size-18 mb-3 text-center">
                      Reset Password
                    </h4>
                    <div className="alert alert-info" role="alert">
                      Enter your Email and instructions will be sent to you!
                    </div>
                    <form onSubmit={usersign} className="form-horizontal mt-4">
                    <div className="form-horizontal mt-4">
                      <div className="mb-3">
                        <Label>Email</Label>
                        <input
                           name="email"
                           value={user.email}
                           className="form-control"
                           placeholder="Enter email"
                           type="email"
                           required
                           onChange={(e) => {
                             handleChange(e);
                           }}
                        />
                      </div>

                      <div style={{ float: "right" }}>
                        <button
                          style={{ width: "100px" }}
                          className="btn btn-info w-md waves-effect waves-light"
                          type="submit"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                    </form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Remember It ?{" "}
                  <Link to="/" className="text-primary">
                    Sign In Here
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

export default Forgot;
