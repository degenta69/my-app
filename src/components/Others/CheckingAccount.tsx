import React from "react";
import { useLineChart } from "../Charts/useLineChart";
import { ReactPortal } from "../Portal/ReactPortal";
import { ChartDataContext } from "../../context/ChartDataContext";
import { Select, MenuItem, Grid } from "@mui/material";
import { SmallDropdown } from "../Controls/Dropdown";

type ICheckingAccount = {};

const CheckingAccount: React.FC<ICheckingAccount> = (props) => {
  const ref = React.useRef<SVGSVGElement>(null);

  const datasets = React.useContext(ChartDataContext);

  const svgRef = useLineChart(ref, datasets!.lineChartData);

  return (
    <>
      <svg width={"100%"} height={"inherit"} ref={svgRef} />
      <ReactPortal wrapperId="id-CheckingAccount-utility">
        <Grid container gap={1} flexWrap={"nowrap"} alignItems={"center"}>
          <SmallDropdown
            size="small"
            displayEmpty
            defaultValue={10}
            inputProps={{ "aria-label": "Without label" }}
            onChange={() => {
              datasets?.randomLineChartData();
            }}
          >
            <MenuItem value="" disabled>
              Select
            </MenuItem>
            <MenuItem value={10}>Manage</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
            <MenuItem value={40}>Forty</MenuItem>
          </SmallDropdown>

          <SmallDropdown
            size="small"
            displayEmpty
            defaultValue={10}
            inputProps={{ "aria-label": "Without label" }}
            onChange={() => {
              datasets?.randomLineChartData();
            }}
          >
            <MenuItem value="" disabled>
              Select
            </MenuItem>
            <MenuItem value={10}>January</MenuItem>
            <MenuItem value={20}>February</MenuItem>
            <MenuItem value={30}>March</MenuItem>
            <MenuItem value={40}>April</MenuItem>X
          </SmallDropdown>
        </Grid>
      </ReactPortal>
    </>
  );
};

export default CheckingAccount;
