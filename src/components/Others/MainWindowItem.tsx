import React from "react";
import { WhiteWrapper } from "../UiCard/BoxWrapper";
import { Grid, Typography, Divider } from "@mui/material";

type Props = {
  title: string;
  children: React.ReactNode;
  utilityWrapperId?: string;
};

const MainWindowItem: React.FC<React.PropsWithChildren<Props>> = (props) => {
  return (
    <WhiteWrapper>
      <Grid container height={'inherit'}>
        <Grid
          height={'18%'}
          px={2}
          item
          container
          xs={12}
          justifyContent={"space-between"}
        >
          <Grid item xs={6} display={'flex'} alignItems={'center'}>
            <Typography variant="body1" fontWeight={600}>
              {props.title}
            </Typography>
          </Grid>
          <Grid item xs={6} container justifyContent={"flex-end"}>
            {props.utilityWrapperId && <div id={props.utilityWrapperId}></div>}
          </Grid>
        </Grid>
        <Divider
          sx={{
            borderColor: "#F1F1F2",
            borderBottomWidth: "2px",
            width: "100%",
            height: "0%",
          }}
        />
        <Grid height={'82%'} item container xs={12}>
          {props.children}
        </Grid>
      </Grid>
    </WhiteWrapper>
  );
};

export default MainWindowItem;
