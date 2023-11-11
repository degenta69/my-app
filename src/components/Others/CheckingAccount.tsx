import React from "react";
import { useLineChart } from "../Charts/useLineChart";
import { ReactPortal } from "../Portal/ReactPortal";
import { ChartDataContext } from "../../context/ChartDataContext";

type ICheckingAccount = {};

const CheckingAccount: React.FC<ICheckingAccount> = (props) => {
  const ref = React.useRef<SVGSVGElement>(null);

  const datasets = React.useContext(ChartDataContext)

  const svgRef = useLineChart(ref, datasets!.lineChartData);

  return (
    <>
      <svg width={"100%"} height={"inherit"} ref={svgRef} />
      {/* <ReactPortal 
        children={
          <div>
            <h1>Testing</h1>
          </div>
        }
        wrapperId="id-CheckingAccount-utility"
      /> */}
    </>
  );
};

export default CheckingAccount;
