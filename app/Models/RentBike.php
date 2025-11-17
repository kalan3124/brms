<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class RentBike extends Model
{
    protected $fillable = [
        'bike_id',
        'per_day_price',
        'days',
        'start_date',
        'end_date',
        'payment_status'
    ];

    public $timestamps = false;

    function bike(): BelongsTo
    {
        return $this->belongsTo(Bike::class, 'bike_id', 'id');
    }
}
