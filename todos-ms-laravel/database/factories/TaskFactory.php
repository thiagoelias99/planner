<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $userId = 'ac669032-885d-4cec-925c-3b8af80093c9';

        return [
            "user_id" => $userId,
            "title" => fake()->sentence(),
            "status"=> fake()->randomElement(['pending', 'in_progress', 'on_hold', "completed", 'deleted']),
        ];
    }
}
