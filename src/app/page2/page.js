import ChartLayout from "./ChartLayout";
import chartOptions from "../chartOptions.json";
import Header from "../components/Header";

export default function Page2() {
  const horizontalBarChartOption = chartOptions.horizontalBarChartOption;
  const velticalBarChartOption = chartOptions.verticalColChart;
  const gaugeChart = chartOptions.gaugeChart;
  const progressGauge = chartOptions.progressGauge;
  const telecomProformanceAreaChart = chartOptions.telecomProformanceAreaChart;



  console.log("chartOptions" + chartOptions);
  return (
    <div className="gap-4 grid grid-cols-12 h-full p-4 w-full">
      <div className="bg-white col-span-12 lg:col-span-7 shadow">
        <Header>Telecom Revenue and Subscriber Growth for 2021 and 2022</Header>

        <ChartLayout option={horizontalBarChartOption} />
      </div>
      <div className="col-span-12 gap-4 grid grid-cols-2 lg:col-span-5 lg:grid-cols-3">
        <div className="bg-white shadow p-4">
          <h3 className="text-sm font-bold">Subscribers</h3>
          <p className="text-xl font-bold">1,54,6789</p>
          <p className="text-green-500 text-sm">+8% from year</p>
        </div>
        <div className="bg-white shadow p-4">
          <h3 className="text-sm font-bold">Revenue</h3>
          <p className="text-xl font-bold">$12.45 M</p>
          <p className="text-red-500 text-sm">-5% from year</p>
        </div>
        <div className="bg-white shadow p-4">
          <Header>Customer Satisfaction</Header>
          <div>
            <ChartLayout option={gaugeChart} />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-4">
          <div className="bg-white shadow p-1">
            <Header>Net Promoter Score</Header>
            <ChartLayout option={gaugeChart} />
          </div>
          <div className="bg-white shadow p-1">
            <h3 className="text-sm font-bold">Subscriber Retention Rate</h3>
            {/* <ChartLayout option={progressGauge} /> */}

          </div>
        </div>
      </div>

      
      <div className="col-span-12 lg:col-span-12 grid grid-cols-2 gap-4">
        <div className="bg-white shadow p-1">
          <Header>Tracking subscriber activity trends across the week</Header>
          <ChartLayout option={velticalBarChartOption} />
        </div>
        <div className="bg-white shadow p-1">
          <Header >
          Operational Efficiency Metrics
          </Header>
          <ChartLayout option={telecomProformanceAreaChart} />

        </div>
      </div>
    </div>
    // <div className="gap-4 grid grid-cols-12 h-full p-4 w-full">
    //   <div className="bg-white col-span-12 lg:col-span-7 p-4 shadow">
    //     <h2 className="text-lg font-bold mb-2">
    //       Actual Vs Budget for the Current Year
    //     </h2>
    //     <ChartLayout />
    //   </div>
    //   <div className="col-span-12 gap-4 grid grid-cols-2 lg:col-span-5 lg:grid-cols-3">
    //    <div className="bg-white shadow p-4">
    //     <h3 className="text-sm font-bold">Subscribers</h3>
    //     <p className="text-xl font-bold">1,54,6789</p>
    //     <p className="text-green-500 text-sm">+8% from year</p>
    //   </div>
    //   <div className="bg-white shadow p-4">
    //     <h3 className="text-sm font-bold">Revenue</h3>
    //     <p className="text-xl font-bold">$12.45 M</p>
    //     <p className="text-red-500 text-sm">-5% from year</p>
    //   </div>
    //   <div className="bg-white shadow p-4">
    //     <h3 className="text-sm font-bold">Customer Satisfaction (CSAT)</h3>
    //   </div>
    //     <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-4">
    //       <div>
    //         <div className="bg-white shadow p-4">
    //           <h3 className="text-sm font-bold">Subscribers</h3>
    //           <p className="text-xl font-bold">1,54,6789</p>
    //           <p className="text-green-500 text-sm">+8% from year</p>
    //         </div>
    //         <div className="bg-white shadow p-4">
    //           <h3 className="text-sm font-bold">Revenue</h3>
    //           <p className="text-xl font-bold">$12.45 M</p>
    //           <p className="text-red-500 text-sm">-5% from year</p>
    //         </div>
    //       </div>
    //       <div className="bg-white shadow p-4">
    //         <h3 className="text-sm font-bold">Customer Satisfaction (CSAT)</h3>
    //       </div>
    //     </div>
    //     <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-4">
    //       <div className="bg-white shadow p-4">
    //         <h3 className="text-sm font-bold">Net Promoter Score (NPS)</h3>
    //       </div>
    //       <div className="bg-white shadow p-4">
    //         <h3 className="text-sm font-bold">Subscriber Retention Rate</h3>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="col-span-12 lg:col-span-12 grid grid-cols-2 gap-4">
    //     <div className="bg-white shadow p-4">
    //       <h3 className="text-sm font-bold">
    //         Average Revenue Per User (ARPU) by Plan
    //       </h3>
    //     </div>
    //     <div className="bg-white shadow p-4">
    //       <h3 className="text-sm font-bold">
    //         Network Utilization Per Subscriber Plan
    //       </h3>
    //     </div>
    //   </div>
    // </div>
  );
}
