import ECharts from '@/app/components/ECharts';
import Card from '@/app/components/Card';
import {Activity, Backpack} from 'lucide-react';
import Widget from '@/app/components/Widget';

export default function DashboardPage() {
  const colors = ['#5470C6', '#91CC75', '#EE6666'];
  const option = {
    color:   colors,
    tooltip: {
      trigger:     'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    grid:    {
      right: '20%'
    },
    toolbox: {
      feature: {
        dataView:    {show: true, readOnly: false},
        restore:     {show: true},
        saveAsImage: {show: true}
      }
    },
    legend:  {
      data: ['Evaporation', 'Precipitation', 'Temperature']
    },
    xAxis:   [
      {
        type:     'category',
        axisTick: {
          alignWithLabel: true
        },
        // prettier-ignore
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    ],
    yAxis:   [
      {
        type:       'value',
        name:       'Evaporation',
        position:   'right',
        alignTicks: true,
        axisLine:   {
          show:      true,
          lineStyle: {
            color: colors[0]
          }
        },
        axisLabel:  {
          formatter: '{value} ml'
        }
      },
      {
        type:       'value',
        name:       'Precipitation',
        position:   'right',
        alignTicks: true,
        offset:     80,
        axisLine:   {
          show:      true,
          lineStyle: {
            color: colors[1]
          }
        },
        axisLabel:  {
          formatter: '{value} ml'
        }
      },
      {
        type:       'value',
        name:       '温度',
        position:   'left',
        alignTicks: true,
        axisLine:   {
          show:      true,
          lineStyle: {
            color: colors[2]
          }
        },
        axisLabel:  {
          formatter: '{value} °C'
        }
      }
    ],
    series:  [
      {
        name: 'Evaporation',
        type: 'bar',
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
        ]
      },
      {
        name:       'Precipitation',
        type:       'bar',
        yAxisIndex: 1,
        data:       [
          2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
        ]
      },
      {
        name:       'Temperature',
        type:       'line',
        yAxisIndex: 2,
        data:       [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      }
    ]
  };

  return (
    <div className="grid grid-flow-col grid-rows-11 gap-4 h-full">

      <div className="row-span-6 grid lg:grid-cols-3 grid-cols-1 gap-4">

        <div className="lg:col-span-2 col-span-1 grid grid-flow-col grid-rows-10 gap-4">

          <div className="row-span-2 grid lg:grid-cols-4 grid-cols-1 gap-4">

            <div className="col-span-1">
              <Widget title='Subscribers'>
                154,628
              </Widget>
            </div>

            <div className="col-span-1">
              <Widget title='Revenue'>
                $7.35M
              </Widget>
            </div>

            <div className="col-span-1">
              <Widget title='Market Share'>
                $2.34M
              </Widget>
            </div>

            <div className="col-span-1">
              <Widget title='Churn Rate'>
                4.67%
              </Widget>
            </div>

          </div>

          <div className="row-span-8 grid lg:grid-cols-2 grid-cols-1 gap-4">

            <div className="col-span-1">
              <Card title="Region-Wise Users">
                Region-Wise Users Chart
              </Card>
            </div>

            <div className="col-span-1">
              <Card title="Total Subscribers Per Service Type">
                Total Subscribers Per Service Type Chart
              </Card>
            </div>

          </div>

        </div>

        <div className="lg:col-span-1 col-span-1">
          <Card title="Service Utilization">
            Service Utilization Chart
          </Card>
        </div>

      </div>

      <div className="row-span-5 grid lg:grid-cols-12 grid-cols-1 gap-4">
        <div className="lg:col-span-3 col-span-1">
          <Card title="Data Plan Purchased">
            Data Plan Purchased Chart
          </Card>
        </div>
        <div className="lg:col-span-5 col-span-1">
          <Card title="Gross Vs Net Subscriber Addition">
            Gross Vs Net Subscriber Addition Chart
          </Card>
        </div>
        <div className="lg:col-span-4 col-span-1">
          <Card title="CAPEX to Sales Ratio">
            CAPEX to Sales Ratio Chart
          </Card>
        </div>
      </div>

    </div>
  );
}
