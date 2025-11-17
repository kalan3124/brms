<?php

use App\Http\Controllers\Bikes\BikeController;
use App\Http\Controllers\Dashboard\DashboardController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('dashboard')->group(function () {
        Route::get('', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('/summry', [DashboardController::class, 'profitSummryByBike'])->name('dashboard.summry');
        // Route::get('/profit', [DashboardController::class, 'profitByBike'])->name('dashboard.profit');
        // Route::get('/collect/bikes', [DashboardController::class, 'todayBikeToCollect'])->name('dashboard.collect.bikes');
        Route::post('/update/availability', [DashboardController::class, 'updateAvailability'])->name('dashboard.update.availability');
    });

    Route::prefix('bikes')->group(function () {
        Route::get('/index', [BikeController::class, 'index'])->name('bikes.index');
        Route::get('/show/all', [BikeController::class, 'showAllBikes'])->name('bikes.show.all');
    });
});
Route::get('/check/licenses', [DashboardController::class, 'monthProfitByBike'])->name('bikes.check.licenses');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
