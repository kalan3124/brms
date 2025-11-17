export type bikeCollect = {
    bike_no: string;
    date: Date;
};

export type monthProfitData = {
    bike_no: string;
    profit: number;
    month: string;
    year: string;
    available?: number;
};

export type Income = {
    bike_no: string;
    profit: number;
    year: string;
};

export type dashboardProps = {
    monthly: number;
    total: number;
    total_bikes: number;
    available_bikes: number;
    data_table_data: { income: Income[] };
    today_bike_to_collect: bikeCollect[];
    month_data_table_data: { income: monthProfitData[] };
    available: boolean;
};

export type cardData = {
    monthly: number;
    total: number;
    total_bikes: number;
    available_bikes: number;
};

export type SectionCardsProps = {
    data: cardData;
};

export type Bikes = {
    id: number;
    no: string;
    type: number;
    model: number;
    available: number;
};

export type BikeProps = {
    bikes: Bikes[];
};
