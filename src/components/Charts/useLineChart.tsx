import { useEffect, useState } from "react";
import * as d3 from "d3";

// type LineChartData = [];

export const useLineChart = (
  svgRef: React.RefObject<SVGSVGElement>,
  data: number[]
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
    const margin = { top: 10, right: 10, bottom: 30, left: 30 };
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

    // setting the scaleing
    // xscales
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([-20, w]);
    //yscales
    const yScale = d3.scaleLinear().domain([0, h]).range([h, 0]);

    //  Setup functions to draw Lines ---------------//
    const generateScaledLine = d3
      .line()
      .x((d, i) => xScale(i))
      //@ts-ignore
      .y(yScale)
      .curve(d3.curveCardinal);

    // setting the axes
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(1 + data.length)
      //@ts-ignore
      .tickFormat((i) => i + 1);

      svg
      .append("g")
      .call(xAxis.tickSize(0))
      .attr("transform", `translate(0,${h})`)
      .attr("font-size", "1rem")
      .select(".domain")
      .remove();

    // setting up the data for the svg
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .transition()
      .ease(d3.easePolyOut)
      //@ts-ignore
      .attr("d", (d) => generateScaledLine(d))
      .attr("fill", "none")
      .attr("stroke", "#59AC82")
      .attr("stroke-width", 2)
  }, [data, height, svgRef, width]);

  return svgRef;
};
