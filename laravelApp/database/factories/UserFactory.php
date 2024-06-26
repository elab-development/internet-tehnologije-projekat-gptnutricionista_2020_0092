<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'email_verified_at' => now(),
            'password' => '$2y$10$TKh8H1.PfQxTIVJMPgaHbE4KOFd8lbUNth4Ro83jEMRYYRQJKU5G6', // password
            'remember_token' => Str::random(10),
            'height' => $this->faker->numberBetween(150, 200),  
            'weight' => $this->faker->numberBetween(50, 100),  
            'goal_weight' => $this->faker->numberBetween(45, 95),  
            'dietary_preferences' => $this->faker->randomElement(['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'None']),
            'created_at' => $this->faker->dateTimeBetween('first day of January this year', 'last day of December this year'),  
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
