<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE personalized_trainings MODIFY COLUMN training_type ENUM('Strength', 'Aerobics', 'Circuit', 'Balance', 'Cardio', 'Anaerobic', 'Stretching')");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("ALTER TABLE personalized_trainings MODIFY COLUMN training_type STRING");
    }
};
