<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up()
    {
        Schema::table('ingredients', function (Blueprint $table) {
            $table->dropColumn('unit'); // remove old unit column
        });
    }

    public function down()
    {
        Schema::table('ingredients', function (Blueprint $table) {
            $table->string('unit', 50)->nullable(); // bring back unit
        });
    }

};
