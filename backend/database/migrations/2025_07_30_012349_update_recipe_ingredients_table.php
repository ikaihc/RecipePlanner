<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('recipe_ingredients', function (Blueprint $table) {
            $table->dropColumn(['quantity', 'unit_override']);
            $table->string('amount', 100)->notNullable();
        });
    }

    public function down()
    {
        Schema::table('recipe_ingredients', function (Blueprint $table) {
            $table->decimal('quantity', 8, 2)->notNullable();
            $table->string('unit_override', 50)->nullable();
            $table->dropColumn('amount');
        });
    }
};
