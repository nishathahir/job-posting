import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

import React from "react";

const Navbar: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        {" "}
        {/* Ensures the content is contained within a max-width container */}
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left: Logo */}
          <Box>
            <img
              src="/src/assets/cuvette-logo.png"
              alt="Logo"
              style={{ width: "100px", height: "auto" }}
            />
          </Box>

          {/* Right: Contact */}
          <Box>
            <Typography sx={{ color: "black", fontWeight: "bold" }}>
              Contact
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
