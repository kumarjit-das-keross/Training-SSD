import Card from '@/app/components/Card';
import {useEffect, useState} from 'react';
import Spinner from '@/app/components/Spinner';
import ECharts from '@/app/components/ECharts';
import {BASE_DATA} from '@/app/db/base-data';
import {monthOrder} from '@/app/utility/default-values';

const planNamesMap = {
  '5gbPlan':              '5GB Plan',
  '5gbWithTetheringPlan': '5GB with Tethering Plan',
  '2gbPlan':              '2GB Plan',
  '500MbPlan':            '500MB Plan'
};

export default function DataPlanPurchased({filter = {}}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataPromise = new Promise((resolve) => {
      setTimeout(() => {
        let companyWiseData = BASE_DATA['companyWise_dataPlanPurchasedData_Obj'];
        let data = [];
        let dataPlanWiseData = {};

        for (let company in companyWiseData) {
          if (filter.company != null && filter.company !== company) {
            continue;
          }

          let utilizationWiseData = companyWiseData[company];

          for (let plan in utilizationWiseData) {
            let yearWiseData = utilizationWiseData[plan];

            for (let year in yearWiseData) {
              dataPlanWiseData[plan] = dataPlanWiseData?.[plan] || 0;

              let isStartYear = filter.startYear === year;
              let isEndYear = filter.endYear === year;
              let monthWiseData = yearWiseData[year];

              for (let month in monthWiseData) {
                if (isStartYear) {
                  if (monthOrder[month] >= monthOrder[filter.startMonth]) {
                    dataPlanWiseData[plan] += monthWiseData[month];
                  }
                } else if (isEndYear) {
                  if (monthOrder[month] <= monthOrder[filter.endMonth]) {
                    dataPlanWiseData[plan] += monthWiseData[month];
                  }
                } else {
                  dataPlanWiseData[plan] += monthWiseData[month];
                }
              }
            }
          }
        }

        for (let plan in dataPlanWiseData) {
          data.push({
            name:  planNamesMap[plan],
            value: dataPlanWiseData[plan]
          });
        }

        resolve(data);
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
    grid:    {
      top:          '2%',
      left:         '2%',
      right:        '2%',
      containLabel: true
    },
    tooltip: {
      trigger: 'item'
    },
    legend:  {
      bottom: 0
    },
    series:  [
      {
        name:     'Plan',
        type:     'pie',
        radius:   '60%',
        center:   ['50%', '40%'],
        data:     data,
        label:    {
          formatter: '{d}%'
        },
        emphasis: {
          itemStyle: {
            shadowBlur:    5,
            shadowOffsetX: 0,
            shadowColor:   'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  const onClickHandler = (params) => {
    console.log(params);
  };

  return (
    <div className="lg:col-span-3 col-span-1">
      <Card title="Data Plan Purchased">
        {
          loading ? (
            <Spinner/>
          ) : (
            <ECharts option={option} onClick={onClickHandler}/>
            // <ECharts option={{title: 'Data Plan Purchased'}}/>
          )
        }
      </Card>
    </div>
  );
}
