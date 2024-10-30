<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Todo>
 */
class TodoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $userId = fake()->uuid();

        return [
            "user_id" => $userId,
            "title" => fake()->sentence(),
            "status"=> fake()->randomElement(['pending', 'in_progress', 'on_hold', "completed", 'deleted']),
        ];
    }
}
