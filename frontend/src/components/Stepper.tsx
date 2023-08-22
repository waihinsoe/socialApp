import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { TextField } from "@mui/material";
import UploadAvatar from "./UploadAvatar";
import { useState } from "react";

export default function TextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = 4;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
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
        <Typography>hello</Typography>
      </Paper>
      <Box sx={{ height: 255, maxWidth: 400, width: "100%", p: 2 }}>
        {/* {steps[activeStep].description} */}
        {activeStep === 0 && (
          <TextField
            id="name"
            label="name"
            variant="filled"
            color="warning"
            fullWidth
          />
        )}
        {activeStep === 1 && (
          <TextField
            id="email"
            label="Email"
            variant="filled"
            color="warning"
            fullWidth
          />
        )}
        {activeStep === 2 && (
          <TextField
            id="password"
            label="Password"
            variant="filled"
            color="warning"
            fullWidth
          />
        )}
        {activeStep === 3 && <UploadAvatar setPreview={preview} />}
      </Box>
      <MobileStepper
        sx={{ backgroundColor: "warning.main", color: "#fff" }}
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
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
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
  );
}
