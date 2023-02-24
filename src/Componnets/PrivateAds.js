import React, { useEffect, useState } from 'react'
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
    ModalHeader, ModalBody, ModalFooter,
} from "reactstrap"
import Table from 'react-bootstrap/Table';
import Box from '@mui/material/Box';
import CssBaseline from "@mui/material/CssBaseline";
import { NavLink, Link } from "react-router-dom";
import mark from "../assets/images/mark1.jpg";
import avatar from "../assets/images/users/user-1.jpg"
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// import { AvForm, input } from "availity-reactstrap-validation"
import qrcode from "../assets/images/qrcode.png";
import Modal from 'react-bootstrap/Modal';

function PrivateAds() {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showResults, setShowResults] = React.useState(false);
    const showfield = () => setShowResults(true);
    const hidefield = () => setShowResults(false);

    return (
        <div>
            {/* <Sidebar/> */}

            <Box sx={{ display: "flex" }} className="cardmrg">
            <div className='backgrounimgstyle'>
                    <Sidebar />
                </div>
                <div className='drawecontent'>
                    <Sidebarres />
                </div>
                {/* <CssBaseline /> */}
                <Row className='continer cotainerstyle2 mb-5' style={{ width: "100%" }}>
                    <Col md={12}>
                        <div className='mb-4'>
                            <h5>Private Commercial Ads</h5>
                            <span style={{ fontSize: " 15px" }}><Link to="/Dashboard">Aquin</Link> <i class="fa fa-angle-double-right" aria-hidden="true"></i> Private Commercial Ads</span>
                        </div>


                        <div  style={{float:"right"}}>
                            <Link to="/advertisements" >
                                <button style={{ width: "100px", background: "#1babd7", color: "#fff" }} className="btn btn mb-3" ><i class="fa fa-arrow-circle-left" aria-hidden="true"></i> Back</button>
                            </Link>
                        </div>
                     <div>
                     <Row style={{margin: "80px 0px 0px 0px"}}>
                     <Col md="4">
                    <Card>
                        <CardBody>
                            <div className="embed-responsive embed-responsive-16by9 ratio ratio-16x9">
                                {/* <iframe
                      title="test"
                      className="embed-responsive-item"
                      src="https://youtu.be/M7mBXdZnKT8"
                    /> */}
                                <iframe width="784" height="441"
                                    src="https://www.youtube.com/embed/M7mBXdZnKT8"
                                    title="( తెలుగు ) మొదటి  kibho crypto సమావేశాల్లో  CEO రమేష్  గారు. (VZM)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="4">
                    <Card>
                        <CardBody>
                            <div className="embed-responsive embed-responsive-16by9 ratio ratio-16x9">
                                {/* <iframe
                      title="test"
                      className="embed-responsive-item"
                      src="https://youtu.be/M7mBXdZnKT8"
                    /> */}
                                <iframe width="784" height="441"
                                    src="https://www.youtube.com/embed/M7mBXdZnKT8"
                                    title="( తెలుగు ) మొదటి  kibho crypto సమావేశాల్లో  CEO రమేష్  గారు. (VZM)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="4">
                    <Card>
                        <CardBody>
                            <div className="embed-responsive embed-responsive-16by9 ratio ratio-16x9">
                                {/* <iframe
                      title="test"
                      className="embed-responsive-item"
                      src="https://youtu.be/M7mBXdZnKT8"
                    /> */}
                                <iframe width="784" height="441"
                                    src="https://www.youtube.com/embed/M7mBXdZnKT8"
                                    title="( తెలుగు ) మొదటి  kibho crypto సమావేశాల్లో  CEO రమేష్  గారు. (VZM)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="4">
                    <Card>
                        <CardBody>
                            <div className="embed-responsive embed-responsive-16by9 ratio ratio-16x9">
                                {/* <iframe
                      title="test"
                      className="embed-responsive-item"
                      src="https://youtu.be/M7mBXdZnKT8"
                    /> */}
                                <iframe width="784" height="441"
                                    src="https://www.youtube.com/embed/M7mBXdZnKT8"
                                    title="( తెలుగు ) మొదటి  kibho crypto సమావేశాల్లో  CEO రమేష్  గారు. (VZM)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                        </Row>
                     </div>
                    </Col>
                </Row>
            </Box>

        </div >
    )
}

export default PrivateAds
