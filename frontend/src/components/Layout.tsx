import { Box } from "@mui/material";
import { ReactNode } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Box>
      <TopBar />
      <Box sx={{ display: "flex", bgcolor: "primary.main" }}>
        <SideBar />
        <Box
          sx={{
            bgcolor: "secondary.main",
            borderRadius: 5,
            flexGrow: 1,
            p: 3,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
