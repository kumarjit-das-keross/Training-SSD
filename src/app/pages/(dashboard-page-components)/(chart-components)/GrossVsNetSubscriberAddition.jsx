import Card from '@/app/components/Card';
import {useEffect, useState} from 'react';
import {BASE_DATA} from '@/app/db/base-data';
import Spinner from '@/app/components/Spinner';
import ECharts from '@/app/components/ECharts';
import formatNumber from '@/app/utility/formatNumber';

export default function GrossVsNetSubscriberAddition({filter = {}}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataPromise = new Promise((resolve) => {
      setTimeout(() => {
        let companyWiseData = BASE_DATA['companyWise_grossVsNetSubscriberData_Obj'];
        let data = [];
        let yearWiseUsersData = {};

        for (let company in companyWiseData) {
          if (filter.company != null && filter.company !== company) {
            continue;
          }

          let calculationTypeWiseData = companyWiseData[company];

          for (let calculationType in calculationTypeWiseData) {
            let yearWiseData = calculationTypeWiseData[calculationType];

            for (let year in yearWiseData) {
              yearWiseUsersData[year] = yearWiseUsersData?.[year] || {};
              yearWiseUsersData[year][calculationType] = yearWiseUsersData[year]?.[calculationType] || 0;

              let isStartYear = filter.startYear === year;
              let isEndYear = filter.endYear === year;
              let monthWiseData = yearWiseData[year];

              for (let month in monthWiseData) {
                if (isStartYear) {
                  if (ref.monthOrder[month] >= ref.monthOrder[filter.startMonth]) {
                    yearWiseUsersData[year][calculationType] += monthWiseData[month];
                  }
                } else if (isEndYear) {
                  if (ref.monthOrder[month] <= ref.monthOrder[filter.endMonth]) {
                    yearWiseUsersData[year][calculationType] += monthWiseData[month];
                  }
                } else {
                  yearWiseUsersData[year][calculationType] += monthWiseData[month];
                }
              }
            }
          }
        }

        for (let year in yearWiseUsersData) {
          data.push({
            'date': year,
            ...yearWiseUsersData[year]
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
      trigger: 'axis'
    },
    legend:  {
      bottom: 0
    },
    yAxis:   [
      {
        type:         'value',
        name:         'Gross Subscribers',
        nameLocation: 'center',
        nameGap:      45,
        position:     'left',
        // alignTicks:   true,
        axisLabel: {
          formatter: (value) => formatNumber(value, null, 0)
        }
      },
      {
        type:         'value',
        name:         'Net Subscribers',
        nameLocation: 'center',
        nameGap:      50,
        nameRotate:   -90,
        position:     'right',
        alignTicks:   true,
        axisLabel:    {
          formatter: (value) => formatNumber(value, null, 0)
        }
      }
    ],
    xAxis:   {
      type: 'category',
      data: data.map((yearObject) => yearObject['date'])
    },
    series:  [
      {
        name:       'Gross Subscribers',
        type:       'bar',
        stack:      'total',
        barWidth:   '60%',
        label:      {
          show:      true,
          position:  'inside',
          formatter: (params) => formatNumber(params.value, null, 0)
        },
        yAxisIndex: 0,
        data:       data.map((yearObject) => yearObject['grossSubscribers'])
      },
      {
        name:       'Net Subscribers',
        type:       'line',
        stack:      'total',
        label:      {
          show:      true,
          position:  'top',
          formatter: (params) => formatNumber(params.value, null, 0)
        },
        yAxisIndex: 1,
        smooth:     true,
        data:       data.map((yearObject) => yearObject['netSubscribers'])
      }
    ]
  };

  const onClickHandler = (params) => {
    console.log(params);
  };

  return (
    <div className="lg:col-span-5 col-span-1">
      <Card title="Gross Vs Net Subscriber Addition">
        {
          loading ? (
            <Spinner/>
          ) : (
            <ECharts option={option} onClick={onClickHandler}/>
            // <ECharts option={{title: 'Gross Vs Net Subscriber Addition'}}/>
          )
        }
      </Card>
    </div>
  );
}
