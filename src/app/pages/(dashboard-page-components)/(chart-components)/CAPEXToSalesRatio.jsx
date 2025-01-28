import Card from '@/app/components/Card';
import {useEffect, useState} from 'react';
import Spinner from '@/app/components/Spinner';
import ECharts from '@/app/components/ECharts';
import {BASE_DATA} from '@/app/db/base-data';

export default function CAPEXToSalesRatio({filter = {}}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataPromise = new Promise((resolve) => {
      setTimeout(() => {
        let companyWiseData = BASE_DATA['companyWise_capexBySalesPercentData_Obj'];
        let data = [];
        let yearWiseRatioData = {};

        for (let company in companyWiseData) {
          if (filter.company != null && filter.company !== company) {
            continue;
          }

          let yearWiseData = companyWiseData[company];

          for (let year in yearWiseData) {
            yearWiseRatioData[year] = yearWiseRatioData?.[year] || 0;

            let isStartYear = filter.startYear === year;
            let isEndYear = filter.endYear === year;
            let monthWiseData = yearWiseData[year];

            for (let month in monthWiseData) {
              if (isStartYear) {
                if (ref.monthOrder[month] >= ref.monthOrder[filter.startMonth]) {
                  yearWiseRatioData[year] += monthWiseData[month];
                }
              } else if (isEndYear) {
                if (ref.monthOrder[month] <= ref.monthOrder[filter.endMonth]) {
                  yearWiseRatioData[year] += monthWiseData[month];
                }
              } else {
                yearWiseRatioData[year] += monthWiseData[month];
              }
            }
          }
        }

        for (let year in yearWiseRatioData) {
          data.push({
            'date':  year,
            'ratio': yearWiseRatioData[year]
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
      }, 350);
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
    grid: {
      top: 0
    },
    tooltip: {
      trigger: 'axis'
    },
    legend:  {
      bottom: 0
    },
    xAxis:   {
      type: 'category',
      data: data.map((item) => item['date'])
    },
    yAxis:   {
      type: 'value'
    },
    series:  [
      {
        name: 'Ratio',
        data: data.map((item) => item['ratio']),
        type: 'line'
      }
    ]
  };

  return (
    <div className="lg:col-span-4 col-span-1">
      <Card title="CAPEX to Sales Ratio">
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

