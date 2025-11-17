<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rent_bikes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bike_id')->constrained('bikes')->onDelete('cascade');
            $table->decimal('per_day_price', 8, 2)->nullable();
            $table->integer('days')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rent_bikes');
    }
};
