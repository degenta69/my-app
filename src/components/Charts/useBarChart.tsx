import { useEffect, useState } from "react";
import * as d3 from "d3";
import moment from "moment";

// type LineChartData = [];

export const useBarChart = (
  svgRef: React.RefObject<SVGSVGElement>,
  data: { date: Date; amount: number }[]
) => {
  const [width, setWidth] = useState(40);
  const [height, setHeight] = useState(40);

  const getSvgContainerSize = () => {
    const newWidth = svgRef.current?.parentElement?.clientWidth;
    setWidth(newWidth!);

    const newHeight = svgRef.current?.parentElement?.clientHeight;
    setHeight(newHeight!);
  };

  useEffect(() => {
    // detect 'width' and 'height' on render
    getSvgContainerSize();
    // listen for resize changes, and detect dimensions again when they change
    window.addEventListener("resize", getSvgContainerSize);
    // cleanup event listener
    return () => window.removeEventListener("resize", getSvgContainerSize);
  }, []);

  useEffect(() => {

    const margin = { top: 10, right: 30, bottom: 30, left: 30 };
    // setting up svg
    const w = width - (margin.left + margin.right);
    const h = height - (margin.top + margin.bottom);

    const svg = d3
    .select(svgRef.current)
    .attr("width", w)
    .attr("height", h)
    .style("overflow", "visible")
    .style("background", "transparent")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // clear all previous content on refresh
    const everything = svg.selectAll("*");
    everything.remove();

    // make xscale
    const xScale = d3
      .scaleTime()
      .domain([data[data.length - 1].date,data[0].date]) // Assuming data is an array of objects with 'date' property
      .range([0, (w - 10)]).nice();

    // make yscale
    const yScale = d3.scaleLinear().domain([0, 40]).range([h, 0]);

    const xAxisTickFormat = (date: Date, i: number):any => {
        if (i === 0) {
            // For the first tick, display only the month and day
            return 'Future';
        } else if(i === data.length - 1) {
            // For the last tick, display only the month and day
            return 'Older';
        } else {
            // For other ticks, display the week range (Jan 09 - Jan 16, etc.)
            const prevDate = data[i - 1].date;
            const formattedPrev = d3.timeFormat("%d")(prevDate);
            const formattedCurrent = d3.timeFormat("%b %d")(date);
            return `${formattedCurrent} - ${formattedPrev}`;
        }
    };

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(6) // Use timeWeek for weekly ticks
      // .tickSizeOuter(0) // Hide outer ticks
      // .tickSizeInner(0) // Hide inner ticks
      .tickFormat(xAxisTickFormat as unknown as null) // Format tick labels as desired
      .tickPadding(10) // Margin between tick labels and tick marks
      .tickValues(data.map((d) => d.date)); // Set tick values to data

      const barWidth = (xScale(data[0].date) - xScale(data[1].date)) * 0.5;
    // make group for x axis
    svg
      .append("g")
      .classed("x-axis-date", true)
      .call(xAxis.tickSize(0))
      .style("font-size", "0.8rem")
      .attr("class", "x-axis")
      .attr("transform", `translate(${barWidth / 5}, ${h})`)
      .select(".domain")
      .remove().attr("margin-left", margin.left);;



    // make bar chart with d3js v 7.8.5

    svg
    .selectAll("rect")
    // .attr("transform", `translate(-${barWidth/2}, 0)`)
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(d.date))
      .attr("y", (d) => yScale(d.amount))
      .attr("width", w / (data.length + 20))
      .attr("height", (d) => h - yScale(d.amount))
      .attr("fill", "#3EB242")
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("stroke", "#3EB242")
    //   .attr("stroke-width", 1)
    //   .attr("stroke-opacity", 0.5)
    //   .attr("opacity", 0.5)


  }, [data, height, svgRef, width]);

  return svgRef;
};
