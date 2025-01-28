import Card from '@/app/components/Card';
import {useEffect, useState} from 'react';
import {BASE_DATA} from '@/app/db/base-data';
import Spinner from '@/app/components/Spinner';
import ECharts from '@/app/components/ECharts';
import formatNumber from '@/app/utility/formatNumber';

export default function TotalSubscribersPerServiceType({filter = {}}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataPromise = new Promise((resolve) => {
      setTimeout(() => {
        let companyWiseData = BASE_DATA['companyWise_subscriberPerServiceTypeData_Obj'];
        let data = [];
        let yearWisePlanData = {};

        for (let company in companyWiseData) {
          if (filter.company != null && filter.company !== company) {
            continue;
          }

          let planWiseData = companyWiseData[company];

          for (let plan in planWiseData) {
            let yearWiseData = planWiseData[plan];

            for (let year in yearWiseData) {
              yearWisePlanData[year] = yearWisePlanData?.[year] || {};
              yearWisePlanData[year][plan] = yearWisePlanData[year]?.[plan] || 0;

              let isStartYear = filter.startYear === year;
              let isEndYear = filter.endYear === year;
              let monthWiseData = yearWiseData[year];

              for (let month in monthWiseData) {
                if (isStartYear) {
                  if (ref.monthOrder[month] >= ref.monthOrder[filter.startMonth]) {
                    yearWisePlanData[year][plan] += monthWiseData[month];
                  }
                } else if (isEndYear) {
                  if (ref.monthOrder[month] <= ref.monthOrder[filter.endMonth]) {
                    yearWisePlanData[year][plan] += monthWiseData[month];
                  }
                } else {
                  yearWisePlanData[year][plan] += monthWiseData[month];
                }
              }
            }
          }
        }

        for (let year in yearWisePlanData) {
          data.push({
            'date': year,
            ...yearWisePlanData[year]
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
    yAxis:   {
      type:         'value',
      name:         'Subscribers',
      nameLocation: 'center',
      nameGap:      45,
      axisLabel:    {
        formatter: (value) => formatNumber(value, null, 0)
      }
    },
    xAxis:   {
      type: 'category',
      data: data.map((yearObject) => yearObject['date'])
    },
    series:  [
               {name: 'Prepaid', key: 'prePaid'},
               {name: 'Postpaid', key: 'postPaid'},
               {name: 'Fixed', key: 'fixedPlan'}
             ].map(({name, key}) => {
      return {
        name:     name,
        type:     'bar',
        stack:    'total',
        barWidth: '60%',
        label:    {
          show:      true,
          position:  'inside',
          formatter: (params) => formatNumber(params.value, null, 0)
        },
        data:     data.map((yearObject) => yearObject[key])
      };
    })
  };

  return (
    <div className="col-span-1">
      <Card title="Total Subscribers Per Service Type">
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
