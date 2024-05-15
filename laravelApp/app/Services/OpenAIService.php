<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;

class OpenAIService
{
    protected $apiKey;
    protected $apiUrl = 'https://api.openai.com/v1/chat/completions';

    public function __construct()
    {
        $this->apiKey = env('OPENAI_API_KEY');
    }

    public function generateDietPlan($userInput)
    {
        $messages = [
            [
                'role' => 'user',
                'content' => $this->createPrompt($userInput)
            ]
        ];
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
            'Content-Type' => 'application/json',
        ])->post($this->apiUrl, [
            'model' => 'gpt-3.5-turbo',
            'messages' => $messages,
            'temperature' => 0.7,
        ]);

        return $response->json();
    }

    protected function createPrompt($userInput)
    {
        $prompt = "Design a detailed nutrition plan based on the profile details below:\n";
        $prompt .= "Profile information: \n";
        $prompt .= "Height: " . $userInput['height'] . " cm\n";
        $prompt .= "Current Weight: " . $userInput['current_weight'] . " kg\n";
        $prompt .= "Desired Weight: " . $userInput['desired_weight'] . " kg\n";
        $prompt .= "Activity Level: " . $userInput['activity_level'] . "\n";
        $prompt .= "Age: " . $userInput['age'] . "\n";
        $prompt .= "Gender: " . $userInput['gender'] . "\n";
        $prompt .= "Food Preferences: " . $userInput['preferences'] . "\n";
        $prompt .= "The nutrition plan is required for a total of " . $userInput['period'] . " days.\n";
        $prompt .= "Please ensure each day includes a morning meal, midday meal, evening meal, and two small snacks.\n";
        $prompt .= "Target daily calorie intake: " . $userInput['calories'] . " calories.\n";
        $prompt .= "For each meal, provide a recipe, list of ingredients, and nutritional values.\n";
        $prompt .= "Please conclude the nutrition plan.";
        return $prompt;
    }
}
