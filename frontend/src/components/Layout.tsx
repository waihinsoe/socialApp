import { Box } from "@mui/material";
import { ReactNode } from "react";
import TopBar from "./TopBar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Box>
      <TopBar />
      <Box>{children}</Box>
    </Box>
  );
};

export default Layout;
