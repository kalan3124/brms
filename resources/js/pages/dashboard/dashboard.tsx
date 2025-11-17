import { SectionCards } from '@/components/section-cards';
import { dashboardProps } from '@/types/dashboard/types';
import Layout from '../Layout/Layout';
import { ProfitTable } from './profitTable';
import { TodayCollectBikes } from './todayCollect';

export default function Dashboard(props: dashboardProps) {
    return (
        <Layout>
            <SectionCards data={{ ...props }} />
            {props.today_bike_to_collect.length > 0 ? <TodayCollectBikes data={props.today_bike_to_collect} /> : null}
            <ProfitTable type={'month_income'} title={'Month Income'} data={props.month_data_table_data} available={false} />
            <ProfitTable type={'annual_income'} title={'Annual Income'} data={props.data_table_data} available={true} />
        </Layout>
    );
}
