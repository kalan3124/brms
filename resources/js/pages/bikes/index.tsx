import { BikeProps } from '@/types/dashboard/types';
import React from 'react';
import Layout from '../Layout/Layout';
import {DataTable}  from '../../components/owne/data-table';

const Index: React.FC<BikeProps> = ({ bikes }) => {
    console.log(bikes);

    return (
        <Layout>
            <div>
                <p>Bike details will be displayed here</p>
                <DataTable data={[]}/>
            </div>
        </Layout>
    );
};

export default Index;
