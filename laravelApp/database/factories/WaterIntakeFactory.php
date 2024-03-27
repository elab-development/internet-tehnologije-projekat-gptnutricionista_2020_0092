<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WaterIntake>
 */
class WaterIntakeFactory extends Factory
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
            'amount' => $this->faker->numberBetween(200, 3000), // Količina vode u mililitrima
            'date' => $this->faker->date(),
            'time' => $this->faker->time('H:i:s'),
        ];
    }
}
