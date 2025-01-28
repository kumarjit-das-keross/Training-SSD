import Card from '@/app/components/Card';
import {useEffect, useState} from 'react';
import {BASE_DATA} from '@/app/db/base-data';
import Spinner from '@/app/components/Spinner';
import ECharts from '@/app/components/ECharts';

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
    grid: {
      top: 0
    },
    tooltip: {
      trigger: 'axis'
    },
    legend:  {
      bottom: 0
    },
    yAxis:   {
      type: 'value',
    },
    xAxis:   {
      type: 'category',
      data: data.map((yearObject) => yearObject['date'])
    },
    series:  [
      {
        name:     'Gross',
        type:     'bar',
        stack:    'total',
        barWidth: '60%',
        data:     data.map((yearObject) => yearObject['grossSubscribers'])
      },
      {
        name:  'Net',
        type:  'line',
        stack: 'total',
        data:  data.map((yearObject) => yearObject['netSubscribers'])
      }
    ]
  };

  return (
    <div className="lg:col-span-5 col-span-1">
      <Card title="Gross Vs Net Subscriber Addition">
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
