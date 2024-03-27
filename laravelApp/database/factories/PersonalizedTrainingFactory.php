<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PersonalizedTraining>
 */
class PersonalizedTrainingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $trainingTypes = ['Strength', 'Aerobics', 'Circuit', 'Balance', 'Cardio', 'Anaerobic', 'Stretching'];

        return [
            'user_id' => User::inRandomOrder()->first()->id, // Izaberite nasumičnog korisnika iz baze
            'training_type' => $this->faker->randomElement($trainingTypes),
            'duration' => $this->faker->numberBetween(15, 120), // Trajanje u minutima
            'target_muscle_group' => $this->faker->randomElement(['upper body', 'lower body', 'core', 'full body']),
            'instructions' => $this->faker->paragraph,
        ];
    }
}
