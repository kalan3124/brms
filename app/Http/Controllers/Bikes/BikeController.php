<?php

namespace App\Http\Controllers\Bikes;

use App\Helpers\CheckLicense;
use App\Http\Controllers\Controller;
use App\Jobs\CheckLicenseDocsJob;
use App\Models\Bike;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class BikeController extends Controller
{
    function index(): \Inertia\Response
    {
        return Inertia::render('bikes/index', [
            'bikes' => $this->showAllBikes(),
        ]);
    }

    public function showAllBikes(): Collection
    {
        return Bike::all()->makeHidden(['created_at', 'updated_at']);
    }

    function checkBikeLicenses(): array | string
    {
        $expired = CheckLicense::checkBikeLicenses();
        return $expired;
    }
}
