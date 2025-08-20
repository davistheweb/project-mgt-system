<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use GuzzleHttp\Promise\Create;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Josiah Davis',
            'email' => 'josiahdave@gmail.com',
            'password' => bcrypt("Helloworld."),
            "email_verified_at" => time()
        ]);

        Project::factory()->count(30)->hasTasks(30)->create();
    }
}
