import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const RootLayout = () => {

  return (
    <Box>
      <AppBar
        sx={{
          backgroundColor: "#1C3766",
          color: "white",
          fontWeight: "fontWeightBold"
        }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ color: "White" }}>
            SNR - ADS
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ marginTop: "100px" }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default RootLayout;
