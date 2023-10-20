import {  AppBarProps, Box, Drawer, IconButton,  Toolbar, Typography, styled } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import MenuIcon from '@mui/icons-material/Menu';

export interface INavLink {
  icon: JSX.Element;
  label: string;
  href: string;
}

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const RootLayout = () => {
  const [state, setState] = useState(false);
  const [open, setOpen] = useState(false);

  const transactionsNavLinks: INavLink[] = [
    { icon: <ReceiptIcon />, label: 'PO', href: '/po' },
    { icon: <MoveUpIcon />, label: 'Movement', href: '/movement' },
  ]

  return (
    <Box sx={{display: 'flex'}}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setState(!state)}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth ,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth ,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={state}
      ></Drawer>


      <Main open={state} sx={{ marginTop: "100px" }}>
        <Outlet />
      </Main>
    </Box>
  );
}

export default RootLayout;
