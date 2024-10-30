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
        Schema::create('task_statuses', function (Blueprint $table) {
            $table->string("value")->primary();
            $table->string("label");
        });

        Schema::table("tasks", function (Blueprint $table) {
            $table->string("status")->default("pending");
            $table->foreign("status")->references("value")->on("task_statuses");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('task_statuses');
        Schema::table("tasks", function (Blueprint $table) {
            $table->dropForeign(["status"]);
            $table->dropColumn("status");
        });
    }
};
