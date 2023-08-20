import {
  Avatar,
  Box,
  Button,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import UploadAvatar from "../UploadAvatar";
import { useState } from "react";

const customTheme = createTheme({
  palette: {
    warning: {
      main: "#191c21", // Set your desired color here
    },
  },
});

const Register = () => {
  const [preview, setPreview] = useState("");
  const uploadPhoto = async () => {
    const formData = new FormData();
    formData.append("file", preview);
    const response = await fetch("http://localhost:5000/assets", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const result = await response.json();
      console.log(result);
    }
  };
  console.log(preview);
  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          p: 1,
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <UploadAvatar setPreview={setPreview} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 400,
            gap: 2,
            p: 2,
            position: "relative",
          }}
        >
          <Avatar
            src={preview}
            sx={{ width: 100, height: 100, margin: "0 auto" }}
          />
          <TextField id="name" label="name" variant="filled" color="warning" />
          <TextField
            id="email"
            label="Email"
            variant="filled"
            color="warning"
          />
          <TextField
            id="password"
            label="Password"
            variant="filled"
            color="warning"
          />

          <Button variant="contained" color="warning" onClick={uploadPhoto}>
            Register
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography>If you already have an account,</Typography>
            <Link to="/login">
              <Typography sx={{ fontWeight: "bold" }}>Login here</Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default Register;
