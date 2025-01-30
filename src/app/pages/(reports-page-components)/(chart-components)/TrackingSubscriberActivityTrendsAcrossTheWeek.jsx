import Card from '@/app/components/Card';
import {useEffect, useState} from 'react';
import {BASE_DATA} from '@/app/db/base-data';
import Spinner from '@/app/components/Spinner';
import ECharts from '@/app/components/ECharts';
import formatNumber from '@/app/utility/formatNumber';

const subscriberNameMap = {
  prepaidSubscribers:   'Prepaid Subscribers',
  postpaidSubscribers:  'Postpaid Subscribers',
  broadbandSubscribers: 'Broadband Subscribers',
  churnedCustomers:     'Churned Customers',
  newConnections:       'New Connections'
};

export default function TrackingSubscriberActivityTrendsAcrossTheWeek({filter = {}}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            weekday:              'Monday',
            prepaidSubscribers:   320,
            postpaidSubscribers:  100,
            broadbandSubscribers: 50,
            churnedCustomers:     20,
            newConnections:       50
          },
          {
            weekday:              'Tuesday',
            prepaidSubscribers:   300,
            postpaidSubscribers:  120,
            broadbandSubscribers: 60,
            churnedCustomers:     15,
            newConnections:       60
          },
          {
            weekday:              'Wednesday',
            prepaidSubscribers:   310,
            postpaidSubscribers:  110,
            broadbandSubscribers: 70,
            churnedCustomers:     18,
            newConnections:       80
          },
          {
            weekday:              'Thursday',
            prepaidSubscribers:   340,
            postpaidSubscribers:  150,
            broadbandSubscribers: 80,
            churnedCustomers:     25,
            newConnections:       90
          },
          {
            weekday:              'Friday',
            prepaidSubscribers:   380,
            postpaidSubscribers:  160,
            broadbandSubscribers: 90,
            churnedCustomers:     30,
            newConnections:       100
          },
          {
            weekday:              'Saturday',
            prepaidSubscribers:   400,
            postpaidSubscribers:  170,
            broadbandSubscribers: 100,
            churnedCustomers:     40,
            newConnections:       120
          },
          {
            weekday:              'Sunday',
            prepaidSubscribers:   420,
            postpaidSubscribers:  170,
            broadbandSubscribers: 120,
            churnedCustomers:     35,
            newConnections:       150
          }
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
    xAxis:   {
      type: 'category',
      data: data.map((weekObject) => weekObject['weekday'])
    },
    yAxis:   {
      type:         'value',
      name:         'Subscribers/Revenue',
      nameLocation: 'center',
      nameGap:      45
    },
    series:  Object.entries(subscriberNameMap).map(([key, value]) => {
      let extra = {};

      if (value === 'Postpaid Subscribers' || value === 'Broadband Subscribers') {
        extra = {
          stack: 'postpaidBroadbandStack'
        };
      }

      if (value === 'New Connections') {
        extra = {
          markLine: {
            lineStyle: {
              type: 'dashed'
            },
            data:      [[{type: 'min'}, {type: 'max'}]]
          }
        };
      }

      return {
        name: value,
        type: 'bar',
        data: data.map((weekObject) => weekObject[key]),
        ...extra
      };
    })
  };

  const onClickHandler = (params) => {
    console.log(params);
  };

  return (
    <div className="col-span-1">
      <Card title="Tracking Subscriber Activity Trends Across The Week">
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
