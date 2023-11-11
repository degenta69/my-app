import React from "react";
import { useStackedBarChart } from "../Charts/useStackedBarChart";
import { ChartDataContext } from "../../context/ChartDataContext";

type ICashFlow = {};

const CashFlow: React.FC<ICashFlow> = (props) => {
  const ref = React.useRef<SVGSVGElement>(null);

  const datasets = React.useContext(ChartDataContext);

  const svgRef = useStackedBarChart(ref, datasets!.stackedBarChartData!);

  return <svg width={"100%"} height={"inherit"} ref={svgRef} />;
};

export default CashFlow;
