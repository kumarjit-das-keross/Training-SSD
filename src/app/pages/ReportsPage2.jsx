import Spinner from '@/app/components/Spinner';
import Card from '@/app/components/Card';
import Subscribers from '@/app/pages/(reports-page-components)/(widget-components)/Subscribers';
import Revenue from '@/app/pages/(reports-page-components)/(widget-components)/Revenue';
import CustomerSatisfaction from '@/app/pages/(reports-page-components)/(chart-components)/CustomerSatisfaction';

export default function ReportsPage2() {
  const filterObject = {
    company:    null,
    startYear:  null,
    startMonth: 'Jan',
    endYear:    null,
    endMonth:   'Dec'
  };

  return (
    <div className="grid grid-flow-col grid-rows-11 gap-4 lg:h-full h-min">

      <div className="row-span-6 grid lg:grid-cols-2 grid-cols-1 gap-4">

        <div className="col-span-1">
          <Card title="Telecom Revenue and Subscriber Growth for 2021 and 2022">
            <Spinner/>
          </Card>
        </div>

        <div className="col-span-1 grid grid-flow-col grid-rows-11 gap-4 lg:h-full h-min">

          <div className="row-span-5 grid md:grid-cols-3 grid-cols-1 gap-4">

            <Subscribers/>
            <Revenue/>
            <CustomerSatisfaction filter={filterObject}/>

          </div>

          <div className="row-span-6 grid md:grid-cols-2 grid-cols-1 gap-4">

            <div className="col-span-1">
              <Card title="Net Promoter Score">
                <Spinner/>
              </Card>
            </div>

            <div className="col-span-1">
              <Card title="Subscriber Retention Rate">
                <Spinner/>
              </Card>
            </div>

          </div>

        </div>

      </div>

      <div className="row-span-5 grid lg:grid-cols-2 grid-cols-1 gap-4">

        <div className="col-span-1">
          <Card title="Tracking subscriber activity trends across the week">
            <Spinner/>
          </Card>
        </div>

        <div className="col-span-1">
          <Card title="Operational Efficiency Metrics">
            <Spinner/>
          </Card>
        </div>

      </div>

    </div>
  );
}
