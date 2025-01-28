import Subscribers from '@/app/pages/(dashboard-page-components)/(widget-components)/Subscribers';
import Revenue from '@/app/pages/(dashboard-page-components)/(widget-components)/Revenue';
import MarketShare from '@/app/pages/(dashboard-page-components)/(widget-components)/MarketShare';
import ChurnRate from '@/app/pages/(dashboard-page-components)/(widget-components)/ChurnRate';
import DataPlanPurchased from '@/app/pages/(dashboard-page-components)/(chart-components)/DataPlanPurchased';
import GrossVsNetSubscriberAddition
  from '@/app/pages/(dashboard-page-components)/(chart-components)/GrossVsNetSubscriberAddition';
import CAPEXToSalesRatio from '@/app/pages/(dashboard-page-components)/(chart-components)/CAPEXToSalesRatio';
import RegionWiseUsers from '@/app/pages/(dashboard-page-components)/(chart-components)/RegionWiseUsers';
import TotalSubscribersPerServiceType
  from '@/app/pages/(dashboard-page-components)/(chart-components)/TotalSubscribersPerServiceType';
import ServiceUtilization from '@/app/pages/(dashboard-page-components)/(chart-components)/ServiceUtilization';

export default function DashboardPage() {
  const filterObject = {
    startMonth: 'Jan',
    endMonth: 'Dec'
  };

  return (
    <div className="grid grid-flow-col grid-rows-11 gap-4 h-full">

      <div className="row-span-6 grid lg:grid-cols-3 grid-cols-1 gap-4">

        <div className="lg:col-span-2 col-span-1 grid grid-flow-col grid-rows-10 gap-4">

          <div className="row-span-2 grid lg:grid-cols-4 grid-cols-1 gap-4">
            <Subscribers/>
            <Revenue/>
            <MarketShare/>
            <ChurnRate/>
          </div>

          <div className="row-span-8 grid lg:grid-cols-2 grid-cols-1 gap-4">
            <RegionWiseUsers filter={filterObject}/>
            <TotalSubscribersPerServiceType filter={filterObject}/>
          </div>

        </div>

        <ServiceUtilization filter={filterObject}/>

      </div>

      <div className="row-span-5 grid lg:grid-cols-12 grid-cols-1 gap-4">
        <DataPlanPurchased filter={filterObject}/>
        <GrossVsNetSubscriberAddition filter={filterObject}/>
        <CAPEXToSalesRatio filter={filterObject}/>
      </div>

    </div>
  );
}
