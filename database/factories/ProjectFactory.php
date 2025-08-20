<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
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
            'image_path' => $faker->imageUrl(60, 40, 'png', null, $faker->hexColor(), $faker->word()),
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

}
