import * as React from "react";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Dashboard from "@mui/icons-material/Dashboard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import ContactsIcon from "@mui/icons-material/Contacts";
import { RoutingPaths } from "../../utility/AppRoutingPath";
import { useNavigate } from "react-router-dom";
import assiduus from "../../assets/images/Assiduus_TM_Logo--1-.png";

const drawerWidth = 240;

type Props = {
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  background: `url(${assiduus}) center center / contain no-repeat`,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  margin: "1rem",
  justifyContent: "flex-end",
}));

const SideBar: React.FC<Props> = ({
  handleDrawerClose,
  handleDrawerOpen,
  open,
  setOpen,
}) => {
  const navigate = useNavigate();

  const [selectedMenuState, setSelectedMenuState] = React.useState("Dashboard");

  const mainMenuListItemsData = [
    {
      CaptionKey: "Dashboard",
      Icon: <Dashboard />,
      Path: RoutingPaths.Dashboard,
    },
    {
      CaptionKey: "Account",
      Icon: <AccountBalanceWalletIcon />,
      Path: RoutingPaths.Account,
    },
    {
      CaptionKey: "Payroll",
      Icon: <AttachMoneyIcon />,
      Path: RoutingPaths.Payroll,
    },
    {
      CaptionKey: "Reports",
      Icon: <DescriptionIcon />,
      Path: RoutingPaths.Reports,
    },
    {
      CaptionKey: "Advisor",
      Icon: <PersonIcon />,
      Path: RoutingPaths.Advisor,
    },
    {
      CaptionKey: "Contacts",
      Icon: <ContactsIcon />,
      Path: RoutingPaths.Contacts,
    },
  ];

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        elevation={0}
        onClose={handleDrawerClose}
        closeAfterTransition
        open={open}
      >
        <DrawerHeader/>

        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            color: "black",
            "& .Mui-selected": {
              backgroundColor: "#46B746 !important",
              color: "white",
              borderRadius: "0",
            },
          }}
        >
          {mainMenuListItemsData.map((menu, menuIndex) => (
            <React.Fragment key={menuIndex + menu.CaptionKey}>
              <ListItemButton
                color="inherit"
                sx={{
                  gap: "1rem",
                }}
                key={menu.CaptionKey}
                selected={menu.CaptionKey === selectedMenuState}
                onClick={() => {
                  // handleDrawerClose()
                  navigate(menu.Path);
                  setSelectedMenuState(menu.CaptionKey);
                }}
              >
                <ListItemIcon
                  sx={{
                    justifyContent: "flex-end",
                    color: "inherit",
                    "& .MuiSvgIcon-root": {
                      fill: "currentColor",
                    },
                  }}
                >
                  {menu.Icon}
                </ListItemIcon>
                <ListItemText primary={menu.CaptionKey} />
              </ListItemButton>
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default SideBar;
