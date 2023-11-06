import React from "react";
import { useLineChart } from "../Charts/useLineChart";
import { ReactPortal } from "../Portal/ReactPortal";

type ICheckingAccount = {};

const CheckingAccount: React.FC<ICheckingAccount> = (props) => {
  const ref = React.useRef<SVGSVGElement>(null);

  const [data, setdata] = React.useState([25, 70, 45, 60, 46, 44,60,32,80,40,100])

  const svgRef = useLineChart(ref, data);


  React.useEffect(() => {
    const interval = setInterval(() => {
      //setdata((prev) => [...prev, Math.random() * 100]);
      // make random data of 11 numbers between 20 and 50
      const randomData = Array.from({ length: 11 }, () =>
        Math.floor(Math.random() * (120 - 30 + 1) + 30)
      );
      setdata(randomData);
    }, 1000);
    return () => clearInterval(interval);
  }, []);


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
