import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
const sideBarItems = [
  { id: 1, label: "Feed", icon: <GridViewIcon />, route: "/" },
  {
    id: 2,
    label: "My community",
    icon: <PeopleAltOutlinedIcon />,
    route: "/community",
  },
  { id: 3, label: "Messages", icon: <ForumOutlinedIcon />, route: "/messages" },
  {
    id: 4,
    label: "Notification",
    icon: <NotificationsOutlinedIcon />,
    route: "/notification",
  },
  {
    id: 5,
    label: "Explore",
    icon: <TravelExploreOutlinedIcon />,
    route: "/explore",
  },
  {
    id: 6,
    label: "Profile",
    icon: <PermIdentityOutlinedIcon />,
    route: "/profile",
  },
  {
    id: 7,
    label: "Settings",
    icon: <SettingsSuggestOutlinedIcon />,
    route: "/settings",
  },
];

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const routeName = location.pathname;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        width: 230,
        bgcolor: "primary.main",
        padding: "0 1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
      }}
    >
      {sideBarItems.map((item) => {
        return (
          <Link
            to={item.route}
            key={item.id}
            style={{ textDecoration: "none" }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                p: 2,
                cursor: "pointer",
                borderRadius: 4,
                backgroundColor:
                  routeName === item.route ? "info.main" : "primary.main",
                color:
                  routeName === item.route
                    ? "textColor.secondary"
                    : "textColor.primary",
                transition: routeName === item.route ? "all 0.3s" : "",
              }}
            >
              {item.icon}
              <Typography
                sx={{
                  userSelect: "none",
                }}
              >
                {item.label}
              </Typography>
            </Box>
          </Link>
        );
      })}
      <Box
        onClick={handleClickOpen}
        sx={{
          display: "flex",
          gap: 2,
          p: 2,
          cursor: "pointer",
          borderRadius: 4,
          backgroundColor:
            routeName === "logout" ? "info.main" : "primary.main",
          color:
            routeName === "logout"
              ? "textColor.secondary"
              : "textColor.primary",
          transition: routeName === "logout" ? "all 0.3s" : "",
        }}
      >
        <LogoutOutlinedIcon />
        <Typography
          sx={{
            userSelect: "none",
          }}
        >
          Logout
        </Typography>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">LOGOUT</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color={"success"}>
            cancel
          </Button>
          <Button
            onClick={() => {
              localStorage.removeItem("accessToken");
              navigate("/login");
              handleClose();
            }}
            autoFocus
            color="error"
          >
            comfirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SideBar;
