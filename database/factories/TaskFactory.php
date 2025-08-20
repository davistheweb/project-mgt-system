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
        $faker = fake();
        $faker->addProvider(new \App\Faker\ImageProvider($faker));


        return [
            'name' => $faker->sentence(),
            'description' => $faker->realText(),
            'due_date' => $faker->dateTimeBetween('now', '+1 year'),
            'status' => $faker->randomElement(['pending', 'in_progress', 'completed']),
            'priority' => $faker->randomElement(['low', 'medium', 'high']),
            'image_path' => $faker->imageUrl(60, 40, 'png', null, $faker->hexColor(), $faker->word()),
            'assigned_user_id' => 1,
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => time(),
            'updated_at' => time()
        ];
    }
}
