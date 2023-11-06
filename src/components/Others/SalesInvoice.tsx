import moment from "moment";
import React from "react";
import { useBarChart } from "../Charts/useBarChart";

type ISalesInvoice = {};

let now = moment();

var chartData = [
  { date: new Date(moment(now).subtract(7, "days").format("DD-MMM-YY")), amount: 20 },
  { date: new Date(moment(now).subtract(14, "days").format("DD-MMM-YY")), amount: 36 },
  { date: new Date(moment(now).subtract(21, "days").format("DD-MMM-YY")), amount: 30 },
  { date: new Date(moment(now).subtract(28, "days").format("DD-MMM-YY")), amount: 40 },
  { date: new Date(moment(now).subtract(35, "days").format("DD-MMM-YY")), amount: 20 },
  { date: new Date(moment(now).subtract(42, "days").format("DD-MMM-YY")), amount: 10 },
  // { date: new Date(moment(now).subtract(17, "days").format("DD-MMM-YY")), amount: 33 },
  // { date: new Date(moment(now).subtract(16, "days").format("DD-MMM-YY")), amount: 33 },
  // { date: new Date(moment(now).subtract(15, "days").format("DD-MMM-YY")), amount: 32 },
  // { date: new Date(moment(now).subtract(13, "days").format("DD-MMM-YY")), amount: 35 },
  // { date: new Date(moment(now).subtract(11, "days").format("DD-MMM-YY")), amount: 31 },
  // { date: new Date(moment(now).subtract(10, "days").format("DD-MMM-YY")), amount: 28 },
  // { date: new Date(moment(now).subtract(9, "days").format("DD-MMM-YY")), amount: 32 },
  // { date: new Date(moment(now).subtract(8, "days").format("DD-MMM-YY")), amount: 30 },
  // { date: new Date(moment(now).subtract(7, "days").format("DD-MMM-YY")), amount: 33 },
  // { date: new Date(moment(now).subtract(6, "days").format("DD-MMM-YY")), amount: 36 },
];

const SalesInvoice: React.FC<ISalesInvoice> = (props) => {

  const ref = React.useRef<SVGSVGElement>(null);
  
  const svgRef = useBarChart(ref, chartData);

  return <svg width={"100%"} height={"inherit"} ref={svgRef} />;
};

export default SalesInvoice;
