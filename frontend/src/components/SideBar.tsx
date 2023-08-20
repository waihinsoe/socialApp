import { Box, Typography } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link, useLocation } from "react-router-dom";
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
  { id: 8, label: "Logout", icon: <LogoutOutlinedIcon />, route: "/logout" },
];

const SideBar = () => {
  const location = useLocation();
  const routeName = location.pathname;

  return (
    <Box
      sx={{
        width: 250,
        bgcolor: "primary.main",
        minHeight: "100vh",
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
    </Box>
  );
};

export default SideBar;
