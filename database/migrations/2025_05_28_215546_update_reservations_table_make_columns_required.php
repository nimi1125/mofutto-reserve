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
        Schema::table('reservations', function (Blueprint $table) {
            $table->string('postal_code')->nullable(false)->change();
            $table->string('address_line1')->nullable(false)->change();
            $table->string('phone_number')->nullable(false)->change();
            $table->date('completed_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->string('postal_code')->nullable()->change();
            $table->string('address_line1')->nullable()->change();
            $table->string('phone_number')->nullable()->change();
            $table->dropColumn('completed_at');
        });
    }
};
