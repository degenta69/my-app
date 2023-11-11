import React, { useState } from "react";
import {
  BarChartData,
  LineChartData,
  StackedBarChartData,
} from "../models/chartDataTypes";
import moment from "moment";

interface IChartDataContext {
  lineChartData: LineChartData;
  setLineChartData: React.Dispatch<React.SetStateAction<LineChartData>>;
  barChartData: BarChartData;
  setBarChartData: React.Dispatch<React.SetStateAction<BarChartData>>;
  stackedBarChartData: StackedBarChartData;
  setStackedBarChartData: React.Dispatch<
    React.SetStateAction<StackedBarChartData>
  >;

  randomLineChartData: () => void;
  randomBarChartData: () => void;
  randomStackedBarChartData: () => void;

  randomizeAllDatasets: () => void;
}

export const ChartDataContext = React.createContext<IChartDataContext | null>(
  null
);

const ChartDataContextProvider: React.FC<React.PropsWithChildren> = (props) => {
  let now = moment();

  const [lineChartData, setLineChartData] = useState<LineChartData>([
    25, 70, 45, 60, 46, 44, 60, 32, 80, 40, 100,
  ]);

  const [barChartData, setBarChartData] = useState<BarChartData>([
    {
      date: new Date(moment(now).subtract(7, "days").format("DD-MMM-YY")),
      amount: 20,
    },
    {
      date: new Date(moment(now).subtract(14, "days").format("DD-MMM-YY")),
      amount: 36,
    },
    {
      date: new Date(moment(now).subtract(21, "days").format("DD-MMM-YY")),
      amount: 30,
    },
    {
      date: new Date(moment(now).subtract(28, "days").format("DD-MMM-YY")),
      amount: 40,
    },
    {
      date: new Date(moment(now).subtract(35, "days").format("DD-MMM-YY")),
      amount: 20,
    },
    {
      date: new Date(moment(now).subtract(42, "days").format("DD-MMM-YY")),
      amount: 10,
    },
  ]);

  const [stackedBarChartData, setStackedBarChartData] =
    useState<StackedBarChartData>([
      {
        date: new Date(moment(now).subtract(1, "months").format("DD-MMM-YY")),
        unhcr_resettlement: 72.9,
        other_resettlement: 25.8,
      },
      {
        date: new Date(moment(now).subtract(2, "months").format("DD-MMM-YY")),
        unhcr_resettlement: 61.6,
        other_resettlement: 18.1,
      },
      {
        date: new Date(moment(now).subtract(3, "months").format("DD-MMM-YY")),
        unhcr_resettlement: 69.3,
        other_resettlement: 19.8,
      },
      {
        date: new Date(moment(now).subtract(4, "months").format("DD-MMM-YY")),
        unhcr_resettlement: 71.4,
        other_resettlement: 27,
      },
      {
        date: new Date(moment(now).subtract(5, "months").format("DD-MMM-YY")),
        unhcr_resettlement: 73.6,
        other_resettlement: 31.6,
      },
      {
        date: new Date(moment(now).subtract(6, "months").format("DD-MMM-YY")),
        unhcr_resettlement: 81.9,
        other_resettlement: 26.3,
      },
    ]);

  const randomLineChartData = () => {
    const randomData = Array.from({ length: 11 }, () =>
      Math.floor(Math.random() * (120 - 30 + 1) + 30)
    );
    setLineChartData(randomData);
  };

  const randomBarChartData = () => {
    const randomData = Array.from({ length: 6 }, () => Math.floor(Math.random() * 31) + 10);

    const randomBarChartData = randomData.map((item, index) => {
      return {
        date: new Date(
          moment(now).subtract(index, "weeks").format("DD-MMM-YY")
        ),
        amount: item,
      };
    });

    setBarChartData(randomBarChartData);
  };

  const randomStackedBarChartData = () => {
    const randomData = Array.from({ length: 6 }, () => Math.floor(Math.random() * 31) + 10);


    const randomStackedBarChartData = randomData.map((item, index) => {
      return {
        date: new Date(
          moment(now).subtract(index, "months").format("DD-MMM-YY")
        ),
        unhcr_resettlement: item,
        other_resettlement: item,
      };
    });

    setStackedBarChartData(randomStackedBarChartData);
  };

  const randomizeAllDatasets = () => {
    randomLineChartData();
    randomBarChartData();
    randomStackedBarChartData();
  };

  return (
    <ChartDataContext.Provider
      value={{
        lineChartData,
        setLineChartData,
        barChartData,
        setBarChartData,
        stackedBarChartData,
        setStackedBarChartData,
        randomLineChartData,
        randomBarChartData,
        randomStackedBarChartData,
        randomizeAllDatasets,
      }}
    >
      {props.children}
    </ChartDataContext.Provider>
  );
};

export default ChartDataContextProvider;
