<?php

namespace App\Providers;

use App\Faker\ImageProvider;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        $this->app->afterResolving('faker', function ($faker) {
            $faker->addProvider(new ImageProvider($faker));
        });

        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }
    }
}
