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
        Schema::create('task_groups', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('user_id')->index('groups_from_user');
            $table->string('title');
            $table->timestamps();
        });

        Schema::table('tasks', function (Blueprint $table) {
            $table->string('group_id')->nullable()->default(null);

            $table->foreign('group_id')->references('id')->on('task_groups')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropForeign(['group_id']);
            $table->dropColumn('group_id');
        });

        Schema::dropIfExists('task_groups');
    }
};
