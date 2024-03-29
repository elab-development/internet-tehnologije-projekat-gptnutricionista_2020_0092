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
        // Kreiranje prompta na osnovu korisničkog unosa 
        $prompt = "Design a nutrition plan based on the profile details below: \n";
        $prompt .= "Profile information: " . json_encode($userInput) . "\n";
        $prompt .= "The nutrition plan is required for a total of " . $userInput['period'] . " days.\n";
        $prompt .= "The meals should fit the following preferences: " . $userInput['preferences'] . ".\n";
        $prompt .= "Please ensure each day includes a morning meal, midday meal, evening meal, and two small snacks.\n";
        $prompt .= "Target daily calorie intake: " . $userInput['calories'] . " calories.\n";
        $prompt .= "Please conclude the nutrition plan."; 
        return $prompt;
    }
}
