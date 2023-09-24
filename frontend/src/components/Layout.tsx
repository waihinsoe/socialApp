import { Box } from "@mui/material";
import { ReactNode, useEffect } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { fetchAppData } from "../store/slice/appSlice";
import { useAppDispatch, useAppSelector } from "../store/hook";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const { isLoading } = useAppSelector((state) => state.app);
  useEffect(() => {
    if (accessToken) {
      dispatch(fetchAppData(accessToken));
    }
  }, [accessToken]);
  if (isLoading) return <Box>loading...</Box>;
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
            width: "70%",
            color: "textColor.primary",
            height: "79vh",
            overflowY: "scroll",
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
