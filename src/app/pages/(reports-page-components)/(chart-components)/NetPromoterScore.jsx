import Card from '@/app/components/Card';
import {useEffect, useState} from 'react';
import Spinner from '@/app/components/Spinner';
import ECharts from '@/app/components/ECharts';

export default function NetPromoterScore({filter = {}}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve([{value: 89}]);
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
          width: 5
        },
        progress:    {
          show:  true,
          width: 9
        },
        axisTick:    {
          show: false
        },
        splitLine:   {
          length:    3,
          distance:  1,
          lineStyle: {
            width: 1
          }
        },
        axisLabel:   {
          fontSize: 11,
          distance: 16
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
      <Card title="Net Promoter Score">
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

