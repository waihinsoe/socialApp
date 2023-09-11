import { Box } from "@mui/material";
import { ReactNode, useEffect } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { fetchAppData } from "../store/slice/appSlice";
import { useAppDispatch } from "../store/hook";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (accessToken) {
      dispatch(fetchAppData(accessToken));
    }
  }, [accessToken]);
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <TopBar />
      <Box
        sx={{
          display: "flex",
          bgcolor: "primary.main",
          flexGrow: 1,
        }}
      >
        <SideBar />
        <Box
          sx={{
            bgcolor: "secondary.main",
            borderRadius: 5,
            flexGrow: 1,
            p: 3,
            color: "textColor.primary",
          }}
        >
          {children}
        </Box>
        <SideBar />
      </Box>
    </Box>
  );
};

export default Layout;
