import { useAppDispatch, useAppSelector } from "../../store/hook";
import { BlueButton } from "../../utils/theme";
import { appData, fetchAppData } from "../../store/slice/appSlice";
import { Avatar, Box, Button, Paper } from "@mui/material";
import { ColorModeContext } from "../../contexts/ColorModeContext";
import { useContext } from "react";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
const Feed = () => {
  const { mode } = useContext(ColorModeContext);
  const { owner } = useAppSelector(appData);
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("accessToken");

  return (
    <Box>
      <Paper elevation={5} sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar src={owner ? owner.asset_url : ""} />
          <input
            style={{
              padding: "12px",
              border: `1px solid ${mode === "dark" ? "#4e5d78" : "#e5e5e5"}`,
              outline: "none",
              borderRadius: "10px",
              width: "100%",
              backgroundColor: mode === "dark" ? "#212833" : "#f9fafb",
              color: mode === "dark" ? "#eeeff2" : "#4e5d78",
            }}
            placeholder="What's happening?"
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            sx={{ color: "white", flexGrow: 1 }}
            startIcon={<VideocamOutlinedIcon />}
          >
            live video
          </Button>
          <Button
            sx={{ color: "white", flexGrow: 1 }}
            startIcon={<PhotoLibraryOutlinedIcon />}
          >
            Photo/video
          </Button>
          <Button
            sx={{ color: "white", flexGrow: 1 }}
            startIcon={<SentimentSatisfiedOutlinedIcon />}
          >
            feeling
          </Button>
          <BlueButton sx={{ width: 150 }}>Post</BlueButton>
        </Box>
      </Paper>
      <BlueButton
        onClick={() => accessToken && dispatch(fetchAppData(accessToken))}
      >
        fetchData
      </BlueButton>
    </Box>
  );
};

export default Feed;
