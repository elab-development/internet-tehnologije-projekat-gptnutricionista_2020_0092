<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\OpenAIService;
use App\Http\Resources\UserResource; // Ako vraćate podatke o korisniku

class PlanIshraneController extends Controller
{
    protected $openAIService;

    public function __construct(OpenAIService $openAIService)
    {
        $this->openAIService = $openAIService;
    }

    public function generateDietPlan(Request $request)
    {
        $validatedData = $request->validate([ 
            'period' => 'required|integer',
            'preferences' => 'required|string',
            'calories' => 'required|integer',
        ]);

        $generatedPlan = $this->openAIService->generateDietPlan($validatedData);

        return response()->json([
            'status' => 'success',
            'diet_plan' => $generatedPlan,
        ]);
    }
}
