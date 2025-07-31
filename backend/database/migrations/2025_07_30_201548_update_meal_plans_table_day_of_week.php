<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateMealPlansTableDayofweek extends Migration
{
    public function up()
    {
        Schema::table('meal_plans', function (Blueprint $table) {
            $table->dropColumn('date');

            $table->enum('day_of_week', [
                'Monday', 'Tuesday', 'Wednesday',
                'Thursday', 'Friday', 'Saturday', 'Sunday'
            ])->after('user_id');
        });
    }

    public function down()
    {
        Schema::table('meal_plans', function (Blueprint $table) {
            $table->dropColumn('day_of_week');
            $table->date('date')->after('user_id');
        });
    }
}
