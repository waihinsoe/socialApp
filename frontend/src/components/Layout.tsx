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
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box sx={{ bgcolor: "primary.main", flexGrow: 1 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
