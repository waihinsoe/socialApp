import {
  Box,
  Button,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../../config/config";

const customTheme = createTheme({
  palette: {
    warning: {
      main: "#191c21", // Set your desired color here
    },
  },
});

const Login = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const login = async () => {
    const isValid = userInfo.email.length > 0 && userInfo.password.length > 0;
    if (!isValid) return alert("wrong credentials");
    const response = await fetch(`${config.apiBaseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });
    if (response.ok) {
      const responseJson = await response.json();
      const accessToken = responseJson.accessToken;
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    }
  };
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
            onChange={(evt) =>
              setUserInfo({ ...userInfo, email: evt.target.value })
            }
          />
          <TextField
            id="password"
            label="Password"
            variant="filled"
            color="warning"
            onChange={(evt) =>
              setUserInfo({ ...userInfo, password: evt.target.value })
            }
          />

          <Button variant="contained" color="warning" onClick={login}>
            Login
          </Button>

          <Link to="/register" style={{ margin: "0 auto" }}>
            <Button variant="contained" color="warning">
              Create Account
            </Button>
          </Link>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default Login;
