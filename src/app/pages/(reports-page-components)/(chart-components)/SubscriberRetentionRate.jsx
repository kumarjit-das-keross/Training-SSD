import Card from '@/app/components/Card';
import {useEffect, useState} from 'react';
import Spinner from '@/app/components/Spinner';
import ECharts from '@/app/components/ECharts';

export default function SubscriberRetentionRate({filter = {}}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve([{value: 81}]);
      }, 300);
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
    grid:   {
      bottom: '0%'
    },
    series: [
      {
        type:        'gauge',
        min:         0,
        max:         100,
        splitNumber: 10,
        radius:      '100%',
        center:      ['50%', '55%'],
        pointer:     {
          width:     5,
          itemStyle: {
            color: 'auto'
          }
        },
        axisLine:    {
          lineStyle: {
            width: 15,
            color: [
              [0.3, '#ff6e76'],
              [0.7, '#fddd60'],
              [1, '#7cffb2']
            ]
          }
        },
        axisTick:    {
          distance:  -15,
          length:    4,
          lineStyle: {
            color: '#fff',
            width: 1
          }
        },
        splitLine:   {
          length:    15,
          distance:  -15,
          lineStyle: {
            color: '#fff',
            width: 2
          }
        },
        axisLabel:   {
          fontSize: 11,
          distance: 20
        },
        detail:      {
          fontSize:       20,
          offsetCenter:   [0, '70%'],
          valueAnimation: true,
          color:          'inherit',
          formatter:      (value) => {
            return Math.round(value) + '';
          }
        },
        data:        data
      }
    ]
  };

  const onClickHandler = (params) => {
    console.log(params);
  };

  return (
    <div className="col-span-1">
      <Card title="Subscriber Retention Rate">
        {
          loading ? (
            <Spinner/>
          ) : (
            <ECharts option={option} onClick={onClickHandler} style={{minHeight: '50px'}}/>
          )
        }
      </Card>
    </div>
  );
}

