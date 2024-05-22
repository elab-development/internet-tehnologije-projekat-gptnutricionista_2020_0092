<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\FoodIntake;
use App\Models\PersonalizedTraining;
use App\Models\User;
use App\Models\WaterIntake;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
           
        User::create([
            'name' => 'Ana Mitic',
            'email' => 'anamitic01@gmail.com',
            'password' => bcrypt('password'),  
            'role'=>'admin'
            
        ]);

        User::create([
            'name' => 'Milica Milojevic',
            'email' => 'milicamilojevic01@gmail.com',
            'password' => bcrypt('password'),
             
        ]);

        // Generisanje dodatnih 10 korisnika koristeći factory
        User::factory(10)->create();

        // Prolazak kroz sve korisnike i dodavanje FoodIntake, WaterIntake i PersonalizedTraining
        User::all()->each(function ($user) {
            FoodIntake::factory(5)->create(['user_id' => $user->id]);
            WaterIntake::factory(3)->create(['user_id' => $user->id]);
            PersonalizedTraining::factory(2)->create(['user_id' => $user->id]);
        });





    }
}
