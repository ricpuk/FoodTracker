import React from "react";
import CanvasJSReact from "../../lib/canvasjs.react";

interface LineChartProps {
  color: string;
  data: DataPoint[];
}

interface DataPoint {
  x: any;
  y: any;
}

const LineChart = (props: LineChartProps) => {
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const { color, data } = props;
  let chart: any;

  const options = {
    theme: "light2",
    axisX: {
      valueFormatString: "MM/DD",
    },
    data: [
      {
        type: "line",
        color: color,
        dataPoints: data,
      },
    ],
    responsive: true,
  };

  React.useEffect(() => {
    if (chart) {
      chart.render();
    }
  }, [data]);

  return (
    <CanvasJSChart options={options} onRef={(ref: any) => (chart = ref)} />
  );
};

export default LineChart;
