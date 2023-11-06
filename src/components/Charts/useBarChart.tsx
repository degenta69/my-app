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
    let lastObj = data[data.length - 1];
    let lastObjTimestamp = lastObj.date;
    let lastAndNow = moment(lastObjTimestamp).diff(moment(), "days");
    console.log(
      "difference between last entry " +
        lastObjTimestamp +
        " and today: " +
        lastAndNow
    );

    const margin = { top: 20, right: 55, bottom: 40, left: 10 };
    // setting up svg
    const w = width - (margin.left + margin.right);
    const h = height - (margin.top + margin.bottom);

    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible")
      .style("background", "transparent");

    // clear all previous content on refresh
    const everything = svg.selectAll("*");
    everything.remove();

    // make xscale
    const xScale = d3
      .scaleTime()
      //@ts-ignore
      .domain(d3.extent(data, (d) => d.date)) // Assuming data is an array of objects with 'date' property
      .range([margin.left, width - margin.right]);

    // make yscale
    const yScale = d3.scaleLinear().domain([0, 40]).range([h, 0]);

    const xAxisTickFormat = (date: Date, i: number) => {
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
      .ticks(1) // Use timeWeek for weekly ticks
      .tickSizeOuter(0) // Hide outer ticks
      .tickSizeInner(0) // Hide inner ticks
      .tickPadding(10) // Margin between tick labels and tick marks
      .tickValues(data.map((d) => d.date)) // Set tick values to data
      .tickFormat(xAxisTickFormat); // Format tick labels as desired

    // make group for x axis
    svg
      .append("g")
      .classed("x-axis-date", true)
      .call(xAxis.tickSize(0))
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${h})`)
      .select(".domain")
      .remove();

    // make bar chart with d3js v 7.8.5

    svg
      .selectAll("rect")
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
