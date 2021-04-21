import React from "react";
import {
  XYPlot,
  HorizontalGridLines,
  XAxis,
  YAxis,
  VerticalBarSeries,
  LabelSeries,
  ChartLabel,
} from "react-vis";

const Chart = ({ company, currentSharesValue, currentBtcValue, oppCost }) => {
  // Store data for column graph
  const columnChartData = [
    { x: company, y: currentSharesValue, color: "red" },
    { x: "BTC", y: currentBtcValue, color: "orange" },
    { x: "Opp. Cost", y: oppCost, color: "green" },
  ];

  return (
    <>
      <XYPlot
        height={200}
        width={250}
        margin={{ left: 70 }}
        colorType="literal"
        xType="ordinal"
        className="xyPlot"
      >
        <HorizontalGridLines />
        <XAxis />
        <YAxis tickLabelAngle={-45} />
        <ChartLabel
          text="Returns"
          className="alt-y-label"
          includeMargin={true}
          xPercent={0.03}
          yPercent={0.00001}
          style={{
            transform: "rotate(-90)",
            textAnchor: "start",
          }}
        />
        <VerticalBarSeries data={columnChartData} />
        <LabelSeries
          data={columnChartData.map((obj) => {
            return {
              ...obj,
              label: Number(obj.y.toFixed(2)).toLocaleString("en-US"),
            };
          })}
          style={{ fontSize: 8 }}
          labelAnchorX="middle"
          labelAnchorY="text-after-edge"
        />
      </XYPlot>
    </>
  );
};

export default Chart;
