import React from "react";
import { useStackedBarChart } from "../Charts/useStackedBarChart";
import { ChartDataContext } from "../../context/ChartDataContext";
import { ReactPortal } from "../Portal/ReactPortal";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

type ICashFlow = {};

const CashFlow: React.FC<ICashFlow> = (props) => {
  const ref = React.useRef<SVGSVGElement>(null);

  const datasets = React.useContext(ChartDataContext);

  const svgRef = useStackedBarChart(ref, datasets!.stackedBarChartData!);

  return (
    <>
      <svg width={"100%"} height={"inherit"} ref={svgRef} />
      <ReactPortal wrapperId="id-CashFlow-utility">
        <Grid
          container
          gap={1}
          justifyContent={"space-between"}
          alignItems={"center"}
          mr={1}
        >
          {[
            {
              color: "#03BB7C",
              label: "In",
            },
            {
              color: "#46B647",
              label: "Out",
            },
          ].map((item, key) => {
            return (
              <Grid key={key} item xs={5} container flexWrap={"nowrap"} gap={1}>
                <Box
                  sx={{
                    width: "1rem",
                    minWidth: "1rem",
                    height: "1rem",
                    backgroundColor: item.color,
                    borderRadius: "4px",
                    display: "inline-block",
                  }}
                />

                <Typography variant="caption" gutterBottom>
                  {item.label}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </ReactPortal>
    </>
  );
};

export default CashFlow;
