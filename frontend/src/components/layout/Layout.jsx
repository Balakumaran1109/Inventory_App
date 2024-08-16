import Header from "../header/Header";
import { Box } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box style={{ minHeight: "80vh" }}>{children}</Box>
    </>
  );
};

export default Layout;
