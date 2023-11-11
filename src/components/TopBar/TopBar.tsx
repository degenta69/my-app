import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Notifications from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import { Search, SearchIconWrapper, StyledInputBase } from "../Controls/Search";
import { Badge, Tooltip } from "@mui/material";
import { ChartDataContext } from "../../context/ChartDataContext";

type Props = {
  handleDrawerOpen: () => void;
};

export default function TopBar({ handleDrawerOpen }: Props) {
  const [notificationCount] = React.useState(3);

  const context = React.useContext(ChartDataContext)

  return (
    <>
      <Box sx={{ flexGrow: 1, color: "white" }}>
        <AppBar color="inherit" position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="primary"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              color="primary"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Assiduus
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "black",
                ml: 3,
              }}
            >
              <Tooltip title="Randomize all datasets">
              <IconButton onClick={()=>{context && context?.randomizeAllDatasets()}} disableRipple disableFocusRipple>
                <Badge
                  color="primary"
                  variant="dot"
                  invisible={notificationCount === 0}
                >
                  <Notifications />
                </Badge>
              </IconButton>
              </Tooltip>
              <Avatar sx={{ ml: 3, borderRadius: 8, width: 24, height: 24, cursor:'pointer' }} />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
