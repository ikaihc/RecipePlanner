<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('shopping_lists', function (Blueprint $table) {
            $table->dropColumn('quantity');
            $table->dropColumn('unit_override');
        });
    }

    public function down()
    {
        Schema::table('shopping_lists', function (Blueprint $table) {
            $table->decimal('quantity', 8, 2)->nullable(false);
            $table->string('unit_override', 50)->nullable();
        });
    }
};
