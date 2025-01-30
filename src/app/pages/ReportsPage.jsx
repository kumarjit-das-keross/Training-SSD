import Spinner from '@/app/components/Spinner';
import Card from '@/app/components/Card';
import Subscribers from '@/app/pages/(reports-page-components)/(widget-components)/Subscribers';
import Revenue from '@/app/pages/(reports-page-components)/(widget-components)/Revenue';
import CustomerSatisfaction from '@/app/pages/(reports-page-components)/(chart-components)/CustomerSatisfaction';
import NetPromoterScore from '@/app/pages/(reports-page-components)/(chart-components)/NetPromoterScore';
import SubscriberRetentionRate from '@/app/pages/(reports-page-components)/(chart-components)/SubscriberRetentionRate';
import TelecomRevenueAndSubscriberGrowth
  from '@/app/pages/(reports-page-components)/(chart-components)/TelecomRevenueAndSubscriberGrowth';
import TrackingSubscriberActivityTrendsAcrossTheWeek
  from '@/app/pages/(reports-page-components)/(chart-components)/TrackingSubscriberActivityTrendsAcrossTheWeek';
import OperationalEfficiencyMetrics
  from '@/app/pages/(reports-page-components)/(chart-components)/OperationalEfficiencyMetrics';

export default function ReportsPage() {
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

        <TelecomRevenueAndSubscriberGrowth filter={filterObject}/>

        <div className="col-span-1 grid grid-flow-col grid-rows-11 gap-4 lg:h-full h-min">

          <div className="row-span-5 grid md:grid-cols-3 grid-cols-1 gap-4">
            <Subscribers/>
            <Revenue/>
            <CustomerSatisfaction filter={filterObject}/>
          </div>

          <div className="row-span-6 grid md:grid-cols-2 grid-cols-1 gap-4">
            <NetPromoterScore/>
            <SubscriberRetentionRate/>
          </div>

        </div>

      </div>

      <div className="row-span-5 grid lg:grid-cols-2 grid-cols-1 gap-4">
        <TrackingSubscriberActivityTrendsAcrossTheWeek filter={filterObject}/>
        <OperationalEfficiencyMetrics filter={filterObject}/>
      </div>

    </div>
  );
}
