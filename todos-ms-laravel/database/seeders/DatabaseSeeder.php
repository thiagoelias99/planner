<?php

namespace Database\Seeders;

use App\Models\Todo;
use App\Models\TodoStatus;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        TodoStatus::factory()->createMany([
            ['value' => 'pending', 'label' => 'Pendente'],
            ['value' => 'in_progress', 'label' => 'Em Progresso'],
            ['value' => 'on_hold', 'label' => 'Em Espera'],
            ['value' => 'completed', 'label' => 'Concluído'],
            ['value' => 'deleted', 'label' => 'Apagado'],
        ]);

        Todo::factory(20)->create();
    }
}
