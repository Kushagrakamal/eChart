import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import wineData from "../../Wine-Data.json";
import "./chart.css";

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(wineData); //to set the data when the component is mounted
  }, []);

  //This function groups the data of Alcohol having the same value and thne take out the minimum value of the Magnesium from those grouped data
  const groupedData = Object.values(
    data.reduce((acc, cur) => {
      const key = cur.Alcohol;
      const val = cur.Magnesium;
      if (!(key in acc) || val < acc[key].Magnesium) {
        acc[key] = { Alcohol: key, Magnesium: val };
      }
      return acc;
    }, {})
  );
  //adding the value for the graph axis and plotting. The data is in json format
  const lineOption = {
    xAxis: {
      type: "value",
      name: "Flavanoids",
    },
    yAxis: {
      type: "value",
      name: "Ash",
    },
    series: [
      {
        type: "line",
        data: data.map((item) => [item.Flavanoids, item.Ash]), //getting both the Flavanoids and Ash and mapping throught each item
      },
    ],
  };

  const barOption = {
    xAxis: {
      type: "category",
      data: groupedData.map((d) => d.Alcohol),
      name: "Alcohol",
      //mapping over the data to get Alcohol value
    },
    yAxis: {
      type: "value",
      name: "Magnesium",

      min: 0,
      max: 30,
    },
    series: [
      {
        type: "bar",
        data: groupedData.map((d) => d.Magnesium), //mapping over the data to get minimum Magnesium for a Alcohol
      },
    ],
  };

  return (
    <div className="chart-container">
      <ReactEcharts option={lineOption} />
      <ReactEcharts option={barOption} />
    </div>
  );
};

export default Chart;
