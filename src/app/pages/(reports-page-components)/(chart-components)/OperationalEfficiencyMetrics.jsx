import Card from '@/app/components/Card';
import {useEffect, useState} from 'react';
import {BASE_DATA} from '@/app/db/base-data';
import Spinner from '@/app/components/Spinner';
import ECharts from '@/app/components/ECharts';
import formatNumber from '@/app/utility/formatNumber';

const metricsNameMap = {
  dataCentersPowerUsage:     'Data Centers Power Usage (kWh)',
  networkLatency:            'Network Latency (ms)',
  maintenanceTasksCompleted: 'Maintenance Tasks Completed',
  newTowerInstallations:     'New Tower Installations',
  packetLoss:                'Packet Loss (%)'
};

export default function OperationalEfficiencyMetrics({filter = {}}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            weekday:                   'Monday',
            dataCentersPowerUsage:     5000,
            networkLatency:            30,
            maintenanceTasksCompleted: 20,
            newTowerInstallations:     2,
            packetLoss:                0.5
          },
          {
            weekday:                   'Tuesday',
            dataCentersPowerUsage:     5200,
            networkLatency:            32,
            maintenanceTasksCompleted: 25,
            newTowerInstallations:     3,
            packetLoss:                0.7
          },
          {
            weekday:                   'Wednesday',
            dataCentersPowerUsage:     5100,
            networkLatency:            28,
            maintenanceTasksCompleted: 30,
            newTowerInstallations:     1,
            packetLoss:                0.6
          },
          {
            weekday:                   'Thursday',
            dataCentersPowerUsage:     5300,
            networkLatency:            35,
            maintenanceTasksCompleted: 28,
            newTowerInstallations:     4,
            packetLoss:                0.8
          },
          {
            weekday:                   'Friday',
            dataCentersPowerUsage:     5400,
            networkLatency:            40,
            maintenanceTasksCompleted: 35,
            newTowerInstallations:     3,
            packetLoss:                0.9
          },
          {
            weekday:                   'Saturday',
            dataCentersPowerUsage:     5500,
            networkLatency:            37,
            maintenanceTasksCompleted: 40,
            newTowerInstallations:     5,
            packetLoss:                0.4
          },
          {
            weekday:                   'Sunday',
            dataCentersPowerUsage:     5600,
            networkLatency:            33,
            maintenanceTasksCompleted: 38,
            newTowerInstallations:     4,
            packetLoss:                0.3
          }
        ]);
      }, 400);
    });

    dataPromise
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  const option = {
    grid:    {
      top:          '4%',
      left:         '6%',
      right:        '4%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    legend:  {
      bottom: 0
    },
    xAxis:   {
      type:        'category',
      boundaryGap: false,
      data:        data.map((weekObject) => weekObject['weekday'])
    },
    yAxis:   {
      type:         'log',
      name:         'Metrics',
      nameLocation: 'center',
      nameGap:      65,
      axisLabel:    {
        margin: 20
      }
    },
    series:  Object.entries(metricsNameMap).map(([key, value]) => {
      return {
        name:      value,
        type:      'line',
        smooth:    true,
        areaStyle: {
          opacity: 0.3
        },
        label:     {
          show:     true,
          position: 'top'
        },
        data:      data.map((yearObject) => yearObject[key])
      };
    })
  };

  const onClickHandler = (params) => {
    console.log(params);
  };

  return (
    <div className="col-span-1">
      <Card title="Operational Efficiency Metrics">
        {
          loading ? (
            <Spinner/>
          ) : (
            <ECharts option={option} onClick={onClickHandler}/>
          )
        }
      </Card>
    </div>
  );
}
