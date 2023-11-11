import React from "react";
import { useBarChart } from "../Charts/useBarChart";
import { ChartDataContext } from "../../context/ChartDataContext";

type ISalesInvoice = {};

const SalesInvoice: React.FC<ISalesInvoice> = (props) => {

  const ref = React.useRef<SVGSVGElement>(null);
  
  const datasets = React.useContext(ChartDataContext)

  const svgRef = useBarChart(ref, datasets!.barChartData);

  return <svg width={"100%"} height={"inherit"} ref={svgRef} />;
};

export default SalesInvoice;
