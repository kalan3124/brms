<?php

namespace App\Jobs;

use App\Helpers\CheckLicense;
use App\Models\Bike;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class CheckLicenseDocsJob implements ShouldQueue
{
    use Queueable;

    public $data = [];

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        // $this->data = $data;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {

        Log::info(CheckLicense::checkBikeLicenses());
    }
}
