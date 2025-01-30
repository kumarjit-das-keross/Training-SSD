import Card from '@/app/components/Card';
import {useEffect, useState} from 'react';
import {BASE_DATA} from '@/app/db/base-data';
import Spinner from '@/app/components/Spinner';
import ECharts from '@/app/components/ECharts';
import formatNumber from '@/app/utility/formatNumber';

export default function TelecomRevenueAndSubscriberGrowth({filter = {}}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {name: 'Prepaid Subscribers', 2021: 45, 2022: 50},
          {name: 'Postpaid Subscribers', 2021: 30, 2022: 35},
          {name: 'Broadband Subscribers', 2021: 15, 2022: 18},
          {name: 'Corporate Accounts', 2021: 10, 2022: 12},
          {name: 'IoT Connections', 2021: 8, 2022: 10},
          {name: 'Total Connections', 2021: 108, 2022: 125}
        ]);
      }, 450);
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

  console.log(data);

  const option = {
    grid:    {
      top:          '2%',
      left:         '6%',
      right:        '6%',
      containLabel: true
    },
    tooltip: {
      trigger:     'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend:  {
      bottom: 0
    },
    yAxis:   {
      type: 'category',
      data: data.map((yearObject) => yearObject['name'])
    },
    xAxis:   {
      type:         'value',
      name:         'Revenue (in Million USD)',
      nameLocation: 'center',
      nameGap:      35,
      boundaryGap:  [0, 0.01]
    },
    series:  ['2021', '2022'].map((year) => {
      return {
        name:  year,
        type:  'bar',
        label: {
          show:     true,
          position: 'right'
        },
        data:  data.map((yearObject) => yearObject[year])
      };
    })
  };

  const onClickHandler = (params) => {
    console.log(params);
  };

  return (
    <div className="col-span-1">
      <Card title="Telecom Revenue and Subscriber Growth for 2021 and 2022">
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
