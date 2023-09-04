import { Box } from "@mui/material";
import { ReactNode } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
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
      </Box>
    </Box>
  );
};

export default Layout;
