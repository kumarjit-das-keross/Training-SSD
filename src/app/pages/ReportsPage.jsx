import Header from '@/app/components/Header';
import ChartLayout from '@/app/components/ChartLayout';
import chartOptions from '@/app/db/chartOptions';
import MoveableAndSelecto from '@/app/components/MoveableAndSelecto';

export default function ReportsPage() {
  const horizontalBarChartOption = chartOptions.horizontalBarChartOption;
  const velticalBarChartOption = chartOptions.verticalColChart;
  const NetPromoterScoreGaugeChart = chartOptions.NetPromoterScoreGaugeChart;
  const customerSatisfactionGaugeChart =
          chartOptions.customerSatisfactionGaugeChart;

  const progressGauge = chartOptions.progressGauge;

  const telecomProformanceAreaChart = chartOptions.telecomProformanceAreaChart;

  console.log('chartOptions' + chartOptions);
  return (
    // <div className="h-full w-full">
    //    <div className="elements selecto-area">
    //             {/* {cubes.map(i => <div className="cube" key={i}></div>)} */}
    //             <div className="hi" style={{"height": "250px","width": "300px"}}>
    //             <ECharts  option={horizontalBarChartOption} />
    //             </div>
    //             <div className="hi" style={{"height": "250px","width": "300px"}}>
    //             <ECharts  option={horizontalBarChartOption} />
    //             </div>

    //         </div>
    //   {/* <div id="hi" className="h-1/2 w-1/2 "></div> */}
    //   <MoveableAndSelecto/>
    //   {/* <MoveableEle/> */}
    // </div>
     <MoveableAndSelecto>
     {/*<>*/}
      <div className="elements selecto-area h-full w-full">
        <div className="gap-4 grid grid-cols-12 h-full p-4 w-full">
          <div className="bg-white col-span-12 lg:col-span-7 shadow hi">
            <Header>
              Telecom Revenue and Subscriber Growth for 2021 and 2022
            </Header>

            <ChartLayout option={horizontalBarChartOption}/>
          </div>
          <div className="col-span-12 gap-4 grid grid-cols-2 lg:col-span-5 lg:grid-cols-3">
            <div className="bg-white shadow p-4 hi">
              <h3 className="text-sm font-bold">Subscribers</h3>
              <p className="text-xl font-bold">1,54,6789</p>
              <p className="text-green-500 text-sm">+8% from year</p>
            </div>
            <div className="bg-white shadow p-4 hi">
              <h3 className="text-sm font-bold">Revenue</h3>
              <p className="text-xl font-bold">$12.45 M</p>
              <p className="text-red-500 text-sm">-5% from year</p>
            </div>
            <div className="bg-white shadow p-1 hi">
              <Header>Customer Satisfaction</Header>
              <div>
                <ChartLayout option={customerSatisfactionGaugeChart}/>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-white shadow p-1 hi">
                <Header>Net Promoter Score</Header>
                <ChartLayout option={NetPromoterScoreGaugeChart}/>
              </div>
              <div className="bg-white shadow p-1 hi">
                <Header>Subscriber Retention Rate</Header>
                <ChartLayout option={progressGauge}/>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-12 grid grid-cols-2 gap-4">
            <div className="bg-white shadow p-1 hi">
              <Header>
                Tracking subscriber activity trends across the week
              </Header>
              <ChartLayout option={velticalBarChartOption}/>
            </div>
            <div className="bg-white shadow p-1 hi">
              <Header>Operational Efficiency Metrics</Header>
              <ChartLayout option={telecomProformanceAreaChart}/>
            </div>
          </div>
        </div>
      </div>
     {/*</>*/}
     </MoveableAndSelecto>
  );
}


// export default function ReportsPage() {
//   return (
//     <div className="w-full px-0 flex flex-col flex-wrap h-full">
//       <div className="w-full flex-1 overflow-auto overflow-x-hidden h-full">
//         <div className="w-full flex flex-col">
//           Reports
//         </div>
//       </div>
//     </div>
//   );
// }
