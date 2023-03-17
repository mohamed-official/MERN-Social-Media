import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Container from "./Container";
import Navbar from "./Navbar";
import Rightbar from "./Rightbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Sidebar />
        <Rightbar />
        <Box mx={{ lg: 60 }} pt={24}>
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export default Layout;
