import Card from '@/app/components/Card';
import {useEffect, useState} from 'react';
import {BASE_DATA} from '@/app/db/base-data';
import Spinner from '@/app/components/Spinner';
import ECharts from '@/app/components/ECharts';
import formatNumber from '@/app/utility/formatNumber';

export default function ServiceUtilization({filter = {}}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataPromise = new Promise((resolve) => {
      setTimeout(() => {
        let companyWiseData = BASE_DATA['companyWise_serviceUtilizationData_Obj'];
        let data = [];
        let yearWiseUtilizationData = {};

        for (let company in companyWiseData) {
          if (filter.company != null && filter.company !== company) {
            continue;
          }

          let utilizationWiseData = companyWiseData[company];

          for (let utilization in utilizationWiseData) {
            let yearWiseData = utilizationWiseData[utilization];

            for (let year in yearWiseData) {
              yearWiseUtilizationData[year] = yearWiseUtilizationData?.[year] || {};
              yearWiseUtilizationData[year][utilization] = yearWiseUtilizationData[year]?.[utilization] || 0;

              let isStartYear = filter.startYear === year;
              let isEndYear = filter.endYear === year;
              let monthWiseData = yearWiseData[year];

              for (let month in monthWiseData) {
                if (isStartYear) {
                  if (ref.monthOrder[month] >= ref.monthOrder[filter.startMonth]) {
                    yearWiseUtilizationData[year][utilization] += monthWiseData[month];
                  }
                } else if (isEndYear) {
                  if (ref.monthOrder[month] <= ref.monthOrder[filter.endMonth]) {
                    yearWiseUtilizationData[year][utilization] += monthWiseData[month];
                  }
                } else {
                  yearWiseUtilizationData[year][utilization] += monthWiseData[month];
                }
              }
            }
          }
        }

        for (let year in yearWiseUtilizationData) {
          data.push({
            'date': year,
            ...yearWiseUtilizationData[year]
          });
        }

        if (filter.startYear != null) {
          data = data.filter((yearObject) => {
            return parseInt(yearObject['date']) >= parseInt(filter.startYear);
          });
        }

        if (filter.endYear != null) {
          data = data.filter((yearObject) => {
            return parseInt(yearObject['date']) <= parseInt(filter.endYear);
          });
        }

        resolve(data);
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
      top:          '2%',
      left:         '6%',
      right:        '2%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    legend:  {
      bottom: 0
    },
    xAxis:   {
      type: 'category',
      data: data.map((yearObject) => yearObject['date'])
    },
    yAxis:   {
      type:         'value',
      name:         'Service Utilization',
      nameLocation: 'center',
      nameGap:      45,
      axisLabel:    {
        formatter: (value) => formatNumber(value, null, 0)
      }
    },
    series:  [
               {name: 'Data', key: 'utilizationData'},
               {name: 'Voice', key: 'utilizationVoice'},
               {name: 'Text', key: 'utilizationText'}
             ].map(({name, key}) => {
      return {
        name:   name,
        type:   'line',
        stack:  'Total',
        label:  {
          show:      true,
          position:  'top',
          formatter: (params) => formatNumber(params.value, null, 0)
        },
        smooth: true,
        data:   data.map((yearObject) => yearObject[key])
      };
    })
  };

  return (
    <div className="lg:col-span-1 col-span-1">
      <Card title="Service Utilization">
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
