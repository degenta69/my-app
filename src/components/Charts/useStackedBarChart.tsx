import { useEffect, useState } from "react";
import * as d3 from "d3";

export const useStackedBarChart = (
  svgRef: React.RefObject<SVGSVGElement>,
  data: {
    date: Date;
    unhcr_resettlement: number;
    other_resettlement: number;
  }[]
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

    // create x and y scales
    const x = d3
      .scaleTime()
      .domain([data[data.length - 1].date, data[0].date]) // Assuming data is an array of objects with 'date' property
      .range([0, w])
      .nice();

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, (d) => d.unhcr_resettlement + d.other_resettlement)!,
      ])
      .range([h, 0]);

    const barWidth = (x(data[0].date) - x(data[1].date)) * 0.5;

    // create x and y axis
    const xAxisTickFormat = (date: Date, i: number): any => {
      const formattedCurrent = d3.utcFormat("%B")(date);
      return `${formattedCurrent}`;
    };

    const xAxis = d3
      .axisBottom(x)
      .ticks(6) // Use timeWeek for weekly ticks
      // .tickSizeOuter(0) // Hide outer ticks
      // .tickSizeInner(0) // Hide inner ticks
      .tickFormat(xAxisTickFormat as unknown as null) // Format tick labels as desired
      .tickPadding(10) // Margin between tick labels and tick marks
      .tickValues(data.map((d) => d.date)); // Set tick values to data

    // make group for x axis
    svg
      .append("g")
      .classed("x-axis-date", true)
      .call(xAxis.tickSize(0))
      .style("font-size", "0.8rem")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${h})`)
      .select(".domain")
      .remove()
      .attr("margin-left", margin.left);

    // create stacked data
    const stackedData = d3
    .stack()
    //@ts-ignore
      .keys(["unhcr_resettlement", "other_resettlement"])(data);

    // create color scale
    const color = d3
      .scaleOrdinal()
      .domain(["unhcr_resettlement", "other_resettlement"])
      .range(["#46B647","#03BB7C"]);

    // add stacked bars to svg
    svg
      .append("g")
      .attr("transform", `translate(-${barWidth / 2}, 0)`)
      .selectAll("g")
      .data(stackedData)
      .join("g")
      //@ts-ignore
      .attr("fill", (d) => color(d.key))
      .selectAll("rect")
      // .attr("rx", 16)
      .data((d) => d)
      .join("rect")
      .attr("x", (d) => x(d.data.date)!)
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => y(d[0]) - y(d[1]))
      .attr("width", barWidth)
      // .attr("ry", 8)
      //@ts-ignore
      // //@ts-ignore
      .attr("ry", 8)
      .attr("transform", (d) =>(d.data.unhcr_resettlement == d[1] ?  `translate(0, -20)` :  0))

  }, [data, height, svgRef, width]);

  return svgRef;
};
