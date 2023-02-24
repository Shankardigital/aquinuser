import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
// import Typography from '@mui/material/Typography';
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import PropTypes from "prop-types";
// import Box from '@mui/material/Box';
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
// import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from "@mui/icons-material/Delete";
import Label from "@mui/icons-material/Label";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import InfoIcon from "@mui/icons-material/Info";
import ForumIcon from "@mui/icons-material/Forum";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ArticleIcon from "@mui/icons-material/Article";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import avatar from "../assets/images/users/user-1.jpg";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import logo from "../assets/images/logo1.png";
import Advertisements from "./Advertisements";
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';

import { NavLink, Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import "../common.css";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      background: " linear-gradient(119.54deg,#000046 0%,#1CB5E0 100%)",
      color: "white",
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
        background: " linear-gradient(119.54deg,#000046 0%,#1CB5E0 100%)",
        color: "white",
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} sx={{ mr: 1, color: "white" }} />
          <Typography
            variant="body2"
            sx={{
              fontWeight: "inherit",
              flexGrow: 1,
              fontSize: "13.3px",
              fontFamily: "Poppins",
              color: "white",
              textDecoration: "none",
            }}
          >
            {labelText}
          </Typography>
          <Typography variant="caption" sx={{ color: "white" }}>
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      {...other}
    />
  );
}

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};
function Sidebarres() {

  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const cleardata = () => {
    sessionStorage.clear();
    handleClose();
    // navigate('/');
    window.location.href = "/";
  };

  const [sponsor, setsponsor] = useState({});
  console.log(sponsor.status);

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
        }else if (error.response && error.response.status === 401) {
          toast(error.response.data.message);
          navigate("/");
        }
      }
      );
  };
  useEffect(() => {
    myprofile();
  }, []);

  const datass = sessionStorage.getItem("status")
  console.log(datass)

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar> */}

        <AppBar position="fixed" open={open} id="zzzs">
          <Toolbar>
            {/* <Typography variant="h6" noWrap component="div">
              Aquin 
            </Typography> */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon style={{ color: "black" }} />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge color="error">
                    <Link to="/Notifications">
                      <NotificationsIcon
                        className=""
                        style={{ color: "black" }}
                      />
                    </Link>
                  </Badge>
                </IconButton>
                {/* <p>Notifications</p> */}

                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  {/* <AccountCircle /> */}
                  <img
                    className="rounded-circle avatar-lg img-thumbnail ml-3"
                    style={{ width: "42px" }}
                    src={avatar}
                  />
                </IconButton>
                {/* <MenuItem>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={17} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <p>Notifications</p>
                </MenuItem> */}
                <Menu
                  style={{ marginTop: "50px" }}
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <NavLink to="/Profile" id="links">
                    <MenuItem onClick={handleClose}>
                      <div className="row" style={{ width: "100%" }}>
                        <div
                          className="col mr-5 pcard"
                          style={{ width: "60%" }}
                        >
                          {" "}
                          Profile
                        </div>
                        <div className="col pcard">
                          <div style={{ float: "right" }}>
                            <PersonIcon />
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                  </NavLink>
                  <NavLink id="links">
                    <MenuItem onClick={cleardata}>
                      <div
                        className="row mt-2"
                        style={{ marginBottom: "-10px" }}
                      >
                        <div className="col" style={{ width: "60%" }}>
                          {" "}
                          <p style={{ width: "125px" }}>Log out</p>
                        </div>
                        <div className="col">
                          <ExitToAppIcon />
                        </div>
                      </div>
                    </MenuItem>
                  </NavLink>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              background: " linear-gradient(119.54deg,#000046 0%,#1CB5E0 100%)",
              color: "white",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon style={{ color: "white" }} />
              ) : (
                <ChevronRightIcon style={{ color: "white" }} />
              )}
            </IconButton>
          </DrawerHeader>

          <Drawer
            variant="permanent"
            open={open}
            id="sides"
            style={{ background: "black" }}
          >
            <DrawerHeader>
              {/* <h5 className='text-white mt-2'>Aquin Members</h5> */}
              <img src={logo} style={{ width: "150px" }} />
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon style={{ color: "white" }} />
                ) : (
                  <ChevronLeftIcon style={{ color: "white" }} />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <TreeView
              aria-label="gmail"
              defaultExpanded={["3"]}
              defaultCollapseIcon={<ArrowDropDownIcon />}
              defaultExpandIcon={<ArrowRightIcon />}
              defaultEndIcon={<div style={{ width: 24 }} />}
              sx={{
                height: 264,
                flexGrow: 1,
                maxWidth: 400,
                overflowY: "auto",
              }}
            >
             <Link to="/Dashboard" id="links">
              <StyledTreeItem
                nodeId="1"
                id="fonts"
                labelText="Dashboard"
                labelIcon={DashboardIcon}
              />
            </Link>
            <Link to="/pay" id="links">
              <StyledTreeItem
                nodeId="2"
                labelText="Payments"
                labelIcon={CurrencyRupeeIcon}
              />
            </Link>

            {datass == "approved" ? (
              <>
                <Link to="/Letter" id="links">
                  <StyledTreeItem
                    nodeId="3"
                    labelText="Welcome Letter"
                    labelIcon={ArticleIcon}
                  />
                </Link>
                <Link to="/Members" id="links">
                  <StyledTreeItem
                    nodeId="4"
                    labelText="New Members"
                    labelIcon={GroupIcon}
                  />
                </Link>
                <StyledTreeItem
                  nodeId="5"
                  labelText="Team Members"
                  labelIcon={BarChartIcon}
                >
                  <Link to="/Directmem" id="links">
                    <StyledTreeItem nodeId="6" labelText="Direct Member" />
                  </Link>
                  <Link to="/Levelwise" id="links">
                    <StyledTreeItem nodeId="7" labelText="Levelwise  Team" />
                  </Link>
                </StyledTreeItem>
                <StyledTreeItem
                  nodeId="12"
                  labelText="E-Wallet"
                  labelIcon={AccountBalanceWalletIcon}
                >
                  <Link to="/Bank" id="links">
                    <StyledTreeItem nodeId="8" labelText="Bank Details" />
                  </Link>
                  <Link to="/Earning" id="links">
                    {" "}
                    <StyledTreeItem nodeId="9" labelText="Earning" />
                  </Link>
                  <Link to="/Withdrawal" id="links">
                    <StyledTreeItem nodeId="10" labelText="Withdraw Request" />
                  </Link>
                </StyledTreeItem>

                <Link to="/Advertisements" id="links">
                  <StyledTreeItem
                    nodeId="3"
                    labelText="Ads"
                    labelIcon={BatchPredictionIcon}
                  />
                </Link>

                <StyledTreeItem
                  nodeId="13"
                  labelText="Support"
                  labelIcon={SettingsIcon}
                >
                  <Link to="/Ticket" id="links">
                    <StyledTreeItem nodeId="11" labelText="Ticket Raise" />
                  </Link>
                  {/* <Link to="/Advertisements" id="links">
                    <StyledTreeItem nodeId="11" labelText="Ads" />
                  </Link> */}
                </StyledTreeItem>
                {/* <StyledTreeItem
                  nodeId="13"
                  labelText="Support"
                  labelIcon={Ads}
                >
                  <Link to="/Advertisements" id="links">
                    <StyledTreeItem nodeId="11" labelText="Ticket Raise" />
                  </Link>
                </StyledTreeItem> */}
              </>
            ) : (
              ""
            )}

              {/* <StyledTreeItem nodeId="8" labelText="History" labelIcon={Label} /> */}
            </TreeView>

            <Divider />
          </Drawer>
        </Drawer>
        <ToastContainer/>
        <Main open={open}>
          <DrawerHeader />
        </Main>
      </Box>
    </div>
  );
}

export default Sidebarres;
