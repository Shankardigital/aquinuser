import React from 'react'
import { Row, Col, CardBody, Card, Alert, Container, Label } from "reactstrap"
import { withRouter, Link } from "react-router-dom"
import logo from "../assets/images/logo.png";


function Regesters() {
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
                                        <img src={logo} style={{width:"200px"}} className="auth-logo-dark" />

                                            {/* <img src={logoDark} alt="" height="30" className="auth-logo-dark" />
                      <img src={logoLightPng} alt="" height="30" className="auth-logo-light" /> */}
                                        </Link>
                                    </h3>
                                    {/* <h2 className='text-center text-primary'>Aquin</h2> */}
                                    <div className="p-3">
                                        <h4 className="text-muted font-size-18 mb-1 text-center">Free Register</h4>
                                        <p className="text-muted text-center">Get your free Aquin account now.</p>

                                        <ul class="nav nav-pills nav-fill">
                                            <li class="nav-item">
                                                <Link to="/register">
                                                    <i class="fa fa-address-book text-secondary regtab active " aria-hidden="true"></i>
                                                    <a class="nav-link text-secondary" >User detials</a>
                                                </Link>
                                            </li>
                                            <li class="nav-item">
                                                <Link to="/registers">
                                                    <i class="fa fa-address-book text-secondary regtab active " aria-hidden="true"></i>
                                                    <a class="nav-link text-secondary">More details</a>
                                                </Link>
                                            </li>
                                        </ul>

                                        <form
                                            className="form-horizontal mt-4"
                                        // onValidSubmit={(e, v) => {
                                        //     handleValidSubmit(e, v)
                                        // }}
                                        >
                                            {/* {props.user && props.user ? (
                                                <Alert color="success">
                                                    Register User Successfully
                                                </Alert>
                                            ) : null}

                                            {props.registrationError &&
                                                props.registrationError ? (
                                                <Alert color="danger">
                                                    {props.registrationError}
                                                </Alert>
                                            ) : null} */}

                                            <div className="mb-3">
                                                <Label>Area</Label>
                                                <input
                                                    id="Area"
                                                    name="Area"
                                                    className="form-control"
                                                    placeholder="Enter Area"
                                                    type="text"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <Label>State</Label>
                                                <select className='form-control'>
                                                    <option>Telangana</option>
                                                    <option>Andhra Pradesh</option>
                                                    <option>Goa</option>
                                                    <option>Odisha</option>
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <Label>Pin Code</Label>
                                                <input
                                                    name="Pincod"
                                                    type="number"
                                                    className="form-control"
                                                    required
                                                    placeholder="Enter Pin Code"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <Label>Address</Label>
                                                <textarea
                                                    className="form-control"
                                                    name="addres"
                                                    type="text"
                                                    required
                                                    placeholder="Enter Address"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <Label>Password</Label>
                                                <input
                                                    name="password"
                                                    className="form-control"
                                                    type="password"
                                                    required
                                                    placeholder="Enter Password"
                                                />
                                            </div>


                                            <div className="mb-3 row mt-4">
                                                <div className="col-12 text-end">
                                                    <Link to="/register"><button style={{width:"120px"}} className="btn btn-info  w-md waves-effect waves-light">
                                                        <i class="fa fa-arrow-circle-left" aria-hidden="true"></i> Previous</button></Link>
                                                    <button  className="btn btn-success w-md waves-effect waves-light" style={{ float: "right",width:"120px" }} type="submit">Submit</button>
                                                </div>
                                            </div>

                                            <div className="mb-0 row">
                                                <div className="col-12 mt-4">
                                                    <p className="text-muted mb-0 font-size-14">By registering you agree to the Aquin <Link to="#" className="text-primary">Terms of Use</Link></p>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </CardBody>
                            </Card>
                            <div className="mt-5 text-center">
                                <p>
                                    Already have an account ?{" "}
                                    <Link to="/" className="text-primary">
                                        {" "}
                                        Login
                                    </Link>{" "}
                                </p>
                                <p>
                                    © {new Date().getFullYear()} Aquin
                                    <span className="d-none d-sm-inline-block"> - Designed <i class="fa fa-heart text-danger" aria-hidden="true"></i> by DigitalRaiz Creative Solutions.</span>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Regesters