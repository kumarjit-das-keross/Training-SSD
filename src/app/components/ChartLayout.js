import ECharts from "./ECharts";

export default function ChartLayout({option}) {
   const chartOption = option;
  console.log("chartOption"+ chartOption);
  return (
    <>
      <ECharts option={chartOption} />
    </>
  );
}
