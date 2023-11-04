import { styled } from "@mui/material";
import React from "react";
import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";

type Props = {};

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `auto`,
  width: `100%`,
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const MainLayout:React.FC<React.PropsWithChildren<Props>> = (props) => {
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
  return (
    <>
      <TopBar 
        handleDrawerOpen={handleDrawerOpen}
      />
      <SideBar
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
        open={open}
        setOpen={setOpen}
      />
      <Main open={open}>{props.children}</Main>
    </>
  );
};

export default MainLayout;
