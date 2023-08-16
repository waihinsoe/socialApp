import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../contexts/ColorModeContext";
import SearchIcon from "@mui/icons-material/Search";
const TopBar = () => {
  const { mode, updateData } = useContext(ColorModeContext);
  const { ...data } = useContext(ColorModeContext);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", p: "18px ", bgcolor: "primary.main" }}>
        <Typography
          onClick={() =>
            updateData({ ...data, mode: mode === "light" ? "dark" : "light" })
          }
        >
          SocialApp
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter your todos"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box
                  sx={{
                    display: "grid",
                    placeItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <SearchIcon sx={{ color: "black" }} />
                </Box>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default TopBar;
