import {
  Box,
  Button,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

const customTheme = createTheme({
  palette: {
    warning: {
      main: "#191c21", // Set your desired color here
    },
  },
});

const Login = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ width: "100%", height: "100vh", p: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 400,
            margin: "0 auto",
            mt: 10,
            gap: 2,
            p: 2,
          }}
        >
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
          <Button variant="contained" color="warning">
            Login
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography>If you don't have account,</Typography>
            <Link to="/register">
              <Typography sx={{ fontWeight: "bold" }}>Register here</Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default Login;
