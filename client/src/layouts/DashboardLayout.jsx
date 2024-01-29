import { Box, Container, Typography } from "@mui/material";
import NavbarComponent from "../components/helper/NavbarComponent";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <NavbarComponent />
      <Container>
        <div style={{ marginTop: "20px" }}>{children}</div>
      </Container>
    </div>
  );
};

export default DashboardLayout;
