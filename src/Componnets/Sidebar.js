import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
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
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
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
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import logo from "../assets/images/logo1.png";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router";
import AddCommentIcon from "@mui/icons-material/AddComment";
import "../common.css";
import Advertisements from "./Advertisements";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: " linear-gradient(119.54deg,#000046 0%,#1CB5E0 100%)",
  color: "white",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  background: " linear-gradient(119.54deg,#000046 0%,#1CB5E0 100%)",
  color: "white",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
    background: " linear-gradient(119.54deg,#000046 0%,#1CB5E0 100%)",
    color: "white",
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  // background: "linear-gradient(34.54deg, #000046 0%, #1CB5E0 100%)",
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
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
          <Box component={LabelIcon} sx={{ mr: 2, color: "white" }} />
          <Typography
            sx={{
              flexGrow: 1,
              fontSize: "13.3px",
              fontFamily: "Poppins",
              color: "white",
              textDecoration: "none",
            }}
          >
            {labelText}
          </Typography>
          <Typography variant="caption">{labelInfo}</Typography>
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
    // borderTopRightRadius: theme.spacing(2),
    // borderBottomRightRadius: theme.spacing(2),
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
      // paddingLeft: theme.spacing(2),
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

function Sidebar() {

  const [user, setuser] = useState([]);

  const navigate = useNavigate();

  const getCategory = () => {
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/earning/gettotalmemcoin",
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setuser(res.data.totalCoins);
        console.log(res.data);
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

  useEffect(()=>{
    getCategory()
  },[])


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
    window.location.href = "/login";
  };
  
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

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



  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  const [sponsor, setsponsor] = useState([]);

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
      });
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
        <AppBar position="fixed" open={open} id="zzz">
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

            <p className="text-danger mt-3"><b>Total Coins: {user}</b></p>

            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              
            </Typography>
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge color="error" className="mr-3">
                    <Link to="/Notifications" id="links">
                      <NotificationsIcon
                        style={{ color: "black", background: "none" }}
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
                    className=" rounded-circle avatar-lg img-thumbnail ml-3 mr-5"
                    style={{ width: "42px" }}
                    src={
                      "https://aquinapi.aquin.us" + "/" + sponsor.profileImage
                    }
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
                  <NavLink to="/Profile" className="text-info" id="links">
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
                    <MenuItem onClick={cleardata} className="text-danger">
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
          variant="permanent"
          open={open}
          className="sidebar"
          id="DrawerDatas"
        >
          <DrawerHeader>
            {/* <h5 className='text-white mt-2'>Aquin Members</h5> */}
            <img src={logo} style={{ width: "150px" }} />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon
                  style={{ color: "white", background: "none" }}
                />
              ) : (
                <ChevronLeftIcon
                  style={{ color: "white", background: "none" }}
                />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <TreeView
            aria-label="gmail"
            defaultExpanded={["3"]}
            // defaultCollapseIcon={<ArrowDropDownIcon />}
            // defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
            sx={{
              height: 264,
              flexGrow: 1,
              maxWidth: 400,
              overflowY: "auto",
              paddingTop: "15px",
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
          {/* <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List> */}
          <ToastContainer/>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
        </Box>
      </Box>
    </div>
  );
}

export default Sidebar;
