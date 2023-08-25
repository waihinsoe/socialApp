import {
  Avatar,
  Box,
  Button,
  MobileStepper,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import UploadAvatar from "../UploadAvatar";
import { useState } from "react";
import TextMobileStepper from "../Stepper";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import React from "react";
import { config } from "../../config/config";

const customTheme = createTheme({
  palette: {
    warning: {
      main: "#191c21", // Set your desired color here
    },
  },
});

const Register = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = 4;
  const [preview, setPreview] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    imgUrl: "",
  });

  const shouldDisable = !userInfo.name || !userInfo.email || !userInfo.password;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const createAccount = async () => {
    if (preview.length) {
      const imgData = preview.split(",")[1]; // Assuming `preview` contains the base64 image data
      const imgBlob = new Blob(
        [Uint8Array.from(atob(imgData), (char) => char.charCodeAt(0))],
        { type: "image/jpeg" }
      );
      const formData = new FormData();
      formData.append("file", imgBlob);
      const response = await fetch(`${config.apiBaseUrl}/assets`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const result = await response.json();
        setUserInfo({ ...userInfo, imgUrl: result.data });
      }
    }

    const { name, email, password } = userInfo;
    const isValid = name.length && email.length && password.length;
    if (!isValid) return alert("Please fill all inputs.");
    const response = await fetch(`${config.apiBaseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (response.ok) {
      const responseJson = await response.json();

      console.log(responseJson);
    }
  };
  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          maxWidth: 500,
          flexGrow: 1,
          margin: "0 auto",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          border: "1px solid #191c21",
        }}
      >
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            height: 50,
            pl: 2,
            backgroundColor: "warning.main",
            color: "#fff",
          }}
        >
          <Typography sx={{ margin: "0 auto" }}>SOCIAL APP</Typography>
        </Paper>
        <Box
          sx={{
            height: 255,
            maxWidth: 500,
            width: "100%",
            p: 2,
            flexGrow: { xs: 1 },
            display: "flex",
            alignItems: "center",
          }}
        >
          {activeStep === 0 && (
            <TextField
              id="name"
              label="Enter your name"
              variant="outlined"
              color="warning"
              fullWidth
              onChange={(evt) =>
                setUserInfo({ ...userInfo, name: evt.target.value })
              }
              value={userInfo.name}
            />
          )}
          {activeStep === 1 && (
            <TextField
              id="email"
              label="Enter your email"
              variant="outlined"
              color="warning"
              fullWidth
              onChange={(evt) =>
                setUserInfo({ ...userInfo, email: evt.target.value })
              }
              value={userInfo.email}
            />
          )}
          {activeStep === 2 && (
            <TextField
              id="password"
              label="Enter your password"
              variant="outlined"
              color="warning"
              fullWidth
              onChange={(evt) =>
                setUserInfo({ ...userInfo, password: evt.target.value })
              }
              value={userInfo.password}
            />
          )}
          {activeStep === 3 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                width: "100%",
              }}
            >
              <Avatar
                src={preview}
                sx={{ width: 150, height: 150, margin: "0 auto" }}
              />
              <UploadAvatar setPreview={setPreview} />
            </Box>
          )}
        </Box>
        <MobileStepper
          sx={{
            backgroundColor: "warning.main",
            color: "#fff",
            userSelect: "none",
          }}
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              sx={{
                "&.Mui-disabled": {
                  color: "#5a5a5a",
                },
              }}
              size="small"
              onClick={() => {
                activeStep === maxSteps - 1 ? createAccount() : handleNext();
              }}
              disabled={shouldDisable && activeStep === maxSteps - 1}
            >
              {activeStep === maxSteps - 1 ? "Comfirm" : "Next"}
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{
                "&.Mui-disabled": {
                  color: "#5a5a5a",
                },
              }}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
    </ThemeProvider>
  );
};
export default Register;
