import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

const RootLayout = () => {

  return (
    <Box>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ color: "black", fontWeight: "bold" }}>
            Ads
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{marginTop:"100px"}}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default RootLayout;
