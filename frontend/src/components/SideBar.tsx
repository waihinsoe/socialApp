import { Box, Typography } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useState } from "react";
const sideBarItems = [
  { id: 1, label: "Feed", icon: <GridViewIcon /> },
  { id: 2, label: "My community", icon: <PeopleAltOutlinedIcon /> },
  { id: 3, label: "Messages", icon: <ForumOutlinedIcon /> },
  { id: 4, label: "Notification", icon: <NotificationsOutlinedIcon /> },
  { id: 5, label: "Explore", icon: <TravelExploreOutlinedIcon /> },
  { id: 6, label: "Profile", icon: <PermIdentityOutlinedIcon /> },
  { id: 7, label: "Settings", icon: <SettingsSuggestOutlinedIcon /> },
  { id: 8, label: "Logout", icon: <LogoutOutlinedIcon /> },
];

const SideBar = () => {
  const [selected, setSelected] = useState<Number>(1);
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
          <Box
            onClick={() => setSelected(item.id)}
            sx={{
              display: "flex",
              gap: 2,
              p: 2,
              cursor: "pointer",
              borderRadius: 4,
              backgroundColor:
                selected === item.id ? "info.main" : "primary.main",
              color:
                selected === item.id
                  ? "textColor.secondary"
                  : "textColor.primary",
              transition: selected === item.id ? "all 0.3s" : "",
            }}
            key={item.id}
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
        );
      })}
    </Box>
  );
};

export default SideBar;
