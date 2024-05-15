<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\OpenAIService;

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
            'height' => 'required|numeric',
            'current_weight' => 'required|numeric',
            'desired_weight' => 'required|numeric',
            'activity_level' => 'required|string',
            'age' => 'required|integer',
            'gender' => 'required|string',
        ]);

        $generatedPlan = $this->openAIService->generateDietPlan($validatedData);

        return response()->json([
            'status' => 'success',
            'diet_plan' => $generatedPlan,
        ]);
    }
}
