<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class License extends Model
{
    protected $fillable = ['bike_id', 'license_start_date', 'license_end_date', 'insurance_start_date', 'insurance_end_date'];
}
