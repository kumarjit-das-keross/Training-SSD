import Card from '@/app/components/Card';
import {useEffect, useState} from 'react';
import Spinner from '@/app/components/Spinner';
import ECharts from '@/app/components/ECharts';
import {SOUTH_AFRICA} from '@/app/db/south-africa-geodata';
import {registerMap} from 'echarts';

export default function RegionWiseUsers({filter = {}}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(SOUTH_AFRICA);
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
    grid: {
      top: 0
    },
    tooltip: {
      trigger:            'item',
      showDelay:          0,
      transitionDuration: 0.2
    },
    legend:  {
      bottom: 0
    },
    series:  [
      {
        name:     'South Africa',
        type:     'map',
        roam:     true,
        map:      'ZA',
        emphasis: {
          label: {
            show: true
          }
        },
        data:     []
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
