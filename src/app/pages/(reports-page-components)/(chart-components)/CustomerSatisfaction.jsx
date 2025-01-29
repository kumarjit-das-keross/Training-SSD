import Card from '@/app/components/Card';
import {useEffect, useState} from 'react';
import Spinner from '@/app/components/Spinner';
import ECharts from '@/app/components/ECharts';

export default function CustomerSatisfaction({filter = {}}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve([{value: 85}]);
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
        startAngle:  180,
        endAngle:    0,
        min:         0,
        max:         100,
        splitNumber: 10,
        radius:      '100%',
        center:      ['50%', '65%'],
        itemStyle:   {
          color:         '#58D9F9',
          shadowBlur:    0,
          shadowOffsetX: 0,
          shadowOffsetY: 0
        },
        progress:    {
          show:     true,
          roundCap: true,
          width:    7.5
        },
        pointer:     {
          icon:         'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
          length:       '85%',
          width:        5,
          offsetCenter: [0, '5%']
        },
        axisTick:    {
          show: false
        },
        splitLine:   {
          length:    2,
          distance:  0,
          lineStyle: {
            width: 1
          }
        },
        axisLabel:   {
          fontSize: 8,
          distance: 15
        },
        detail:      {
          fontSize:       16,
          offsetCenter:   [0, 20],
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
      <Card title="Customer Satisfaction">
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

