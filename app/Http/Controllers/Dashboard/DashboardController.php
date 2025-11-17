<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Bike;
use App\Models\RentBike;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('dashboard/dashboard', [
            'monthly' => $this->cardData()['monthly'],
            'total' =>  $this->cardData()['total_income'],
            'total_bikes' => $this->cardData()['total_bikes'],
            'available_bikes' => $this->cardData()['available_bikes'],
            'data_table_data' => $this->profitByBike($request->year)['data'],
            'month_data_table_data' => $this->monthProfitByBike($request->month)['data'],
            'today_bike_to_collect' => $this->todayBikeToCollect()['today_bike_to_collect'],
        ]);
    }
    /**
     * Get the card data for the dashboard.
     *
     * @return array
     */
    public function cardData(): array
    {
        $monthly = RentBike::select(DB::raw('SUM(per_day_price * days) as monthly_profit'))
            ->where('payment_status', 1)
            ->where('start_date', '>=', date('Y-m-01'))
            ->where('start_date', '<=', date('Y-m-t'))
            ->first();

        $total = RentBike::select(DB::raw('SUM(per_day_price * days) as total_profit'))
            ->where('payment_status', 1)
            ->first();

        return [
            'monthly' => $monthly->monthly_profit,
            'total_bikes' => Bike::count(),
            'total_income' => $total->total_profit,
            'available_bikes' => Bike::where('available', '1')->count(),
        ];
    }
    /**
     * Get the profit summary by bike.
     *
     * @return array
     */
    public function profitSummryByBike(Request $request): array
    {
        $months = Config::get('data.months');

        $incomes = [];
        $sum_of_income = 0;

        foreach ($months as $month => $number) {
            $data = RentBike::with('bike')
                ->select('bike_id', DB::raw('SUM(per_day_price * days) as monthly_profit'))
                ->where('payment_status', 1)
                ->where('start_date', '>=', date('Y-m-01', strtotime(date('Y-') . $month)))
                ->where('start_date', '<=', date('Y-m-t', strtotime(date('Y-') . $month)));

            if ($request->bikeNo) {
                $data = $data->where('bike_id', $request->bikeNo);
            }

            $data->groupBy('bike_id');
            $data = $data->get();

            if ($data->isNotEmpty()) {
                foreach ($data as $item) {
                    $incomes[$item->bike->bike_no][] = [
                        'bike_no' => $item->bike->bike_no,
                        'monthly_income' => $item->monthly_profit,
                        'year' => date('Y', strtotime(date('Y-') . $month)),
                        'month' => date('M', strtotime(date('Y-') . $month)),
                        'month_details' => RentBike::where('bike_id', $item->bike_id)->where('start_date', '>=', date('Y-m-01', strtotime(date('Y-') . $month)))
                            ->where('start_date', '<=', date('Y-m-t', strtotime(date('Y-') . $month)))->get()
                    ];

                    $sum_of_income += $item->monthly_profit;
                }
            }
        }
        return [
            'data' => [
                'income' => $incomes,
                'income_summary' => $sum_of_income,
            ]
        ];
    }
    /**
     * Get the profit by bike.
     *
     * @return array
     */
    public function profitByBike($year): array
    {
        $incomes = [];

        $data = RentBike::with('bike')
            ->select('bike_id', DB::raw('SUM(per_day_price * days) as profit'))
            ->where('payment_status', 1);

        if (isset($year)) {
            $data = $data->where('start_date', '>=', $year . '-01-01')
                ->where('start_date', '<=', $year . '-12-31');
        } else {
            $data = $data->where('start_date', '>=', date('Y-01-01'))
                ->where('start_date', '<=', date('Y-12-31'));
        }

        $data->groupBy('bike_id');
        $data = $data->get();

        if ($data->isNotEmpty()) {
            foreach ($data as $item) {
                $incomes[] = [
                    'bike_no' => $item->bike->bike_no,
                    'profit' => $item->profit,
                    'year' => date('Y'),
                    'available' => $item->bike->available,
                ];
            }
        }
        return [
            'data' => [
                'income' => $incomes
            ]
        ];
    }
    /**
     * Get the month profit by bike.
     *
     * @return array
     */
    public function monthProfitByBike($month): array
    {
        $month = date("M");
        $incomes = [];

        $data = RentBike::with('bike')
            ->select('bike_id', DB::raw('SUM(per_day_price * days) as profit'))
            ->where('payment_status', 1);

        if (isset($month)) {
            $data = $data->where('start_date', '>=', date('Y-m-01', strtotime($month)))
                ->where('start_date', '<=', date('Y-m-t', strtotime($month)));
        } else {
            $data = $data->where('start_date', '>=', date('Y-m-01'))
                ->where('start_date', '<=', date('Y-m-t'));
        }

        $data->groupBy('bike_id');
        $data = $data->get();

        if ($data->isNotEmpty()) {
            foreach ($data as $item) {
                $incomes[] = [
                    'bike_no' => $item->bike->bike_no,
                    'profit' => $item->profit,
                    'month' => $month,
                    'year' => date("Y"),
                    'available' => null,
                ];
            }
        }
        return [
            'data' => [
                'income' => $incomes
            ]
        ];
    }
    /**
     * Get the bikes that are to be collected today.
     *
     * @return array
     */
    public function todayBikeToCollect(): array
    {
        $data = RentBike::with('bike')->where('end_date', '=', date('Y-m-d'))->get();
        $data->transform(function ($item) {
            return [
                'bike_no' => $item->bike->bike_no,
                'date' => $item->end_date,
            ];
        });

        return [
            'today_bike_to_collect' => $data
        ];
    }
    /**
     * Update the availability of a bike.
     *
     * @param Request $request
     * @return array
     */
    public function updateAvailability(Request $request)
    {
        Bike::where('bike_no', $request->bike_no)->where('available', 1)->first();
    }
}
