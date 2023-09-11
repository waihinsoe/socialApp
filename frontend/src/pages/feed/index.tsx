import { useAppDispatch, useAppSelector } from "../../store/hook";
import { BlueButton } from "../../utils/theme";
import { appData, fetchAppData } from "../../store/slice/appSlice";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { ColorModeContext } from "../../contexts/ColorModeContext";
import { useContext } from "react";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";

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
        <Box>
          <Box></Box>
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
