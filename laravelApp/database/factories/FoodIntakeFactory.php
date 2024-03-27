<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FoodIntake>
 */
class FoodIntakeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id, // Izaberite nasumičnog korisnika iz baze
            'meal_type' => $this->faker->randomElement(['doručak', 'ručak', 'večera', 'snack']),
            'calories' => $this->faker->numberBetween(100, 800),
            'description' => $this->faker->sentence,
            'date' => $this->faker->date(),
            'time' => $this->faker->time(),
        ];
    }
}
