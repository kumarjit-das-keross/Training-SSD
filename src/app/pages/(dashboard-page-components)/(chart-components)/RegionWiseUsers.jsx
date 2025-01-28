import Card from '@/app/components/Card';
import {useEffect, useState} from 'react';
import Spinner from '@/app/components/Spinner';
import ECharts from '@/app/components/ECharts';
import {SOUTH_AFRICA} from '@/app/db/south-africa-geodata';
import {registerMap} from 'echarts';
import formatNumber from '@/app/utility/formatNumber';

export default function RegionWiseUsers({filter = {}}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {name: 'Northern Cape', value: 51920},
          {name: 'Western Cape', value: 1440000},
          {name: 'Eastern Cape', value: 972460},
          {name: 'Free State', value: 1100000},
          {name: 'KwaZulu-Natal', value: 61340},
          {name: 'North West', value: 69150},
          {name: 'Gauteng', value: 1000000},
          {name: 'Mpumalanga', value: 30050},
          {name: 'Limpopo', value: 38050}
        ]);
      }, 500);
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

  registerMap('ZA', SOUTH_AFRICA);

  const option = {
    grid:      {
      top:          '2%',
      left:         '2%',
      right:        '2%',
      containLabel: true
    },
    tooltip:   {
      trigger:            'item',
      showDelay:          0,
      transitionDuration: 0.2
    },
    visualMap: {
      min:        30000,
      max:        1500000,
      left:       'right',
      bottom:     'center',
      realtime:   false,
      calculable: true,
      inRange:    {
        color: ['lightskyblue', 'lightgreen', 'green']
      }
    },
    series:    [
      {
        name: 'South Africa',
        type: 'map',
        // roam:  true,
        map:          'ZA',
        layoutCenter: ['50%', '85%'],
        layoutSize:   '160%',
        label:        {
          show: true
          // formatter: (params) => formatNumber(params.value, null, 0)
        },
        data:         data
      }
    ]
  };

  return (
    <div className="col-span-1">
      <Card title="Region-Wise Users">
        {
          loading ? (
            <Spinner/>
          ) : (
            <ECharts option={option}/>
          )
        }
      </Card>
    </div>
  );
}
