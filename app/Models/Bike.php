<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bike extends Model
{

    protected $fillable = [
        'bike_no',
        'model',
        'type',
        'available'
    ];

    public $timestamps = false;

    function rents(): HasMany
    {
        return $this->hasMany(RentBike::class, 'bike_id', 'id');
    }

    function license()
    {
        return $this->hasOne(License::class, 'bike_id', 'id');
    }
}
