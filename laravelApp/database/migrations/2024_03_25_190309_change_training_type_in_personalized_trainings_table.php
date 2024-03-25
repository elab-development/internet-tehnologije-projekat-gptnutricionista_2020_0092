<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
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
        Schema::table('personalized_trainings', function (Blueprint $table) {
            $table->dropColumn('training_type');

            $table->enum('training_type', ['Strength', 'Aerobics', 'Circuit', 'Balance', 'Cardio', 'Anaerobic', 'Stretching']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('personalized_trainings', function (Blueprint $table) {
            $table->dropColumn('training_type');
            $table->string('training_type')->after('user_id'); // Dodaje nazad originalnu kolonu bez ograničenja
        });
    }
};
