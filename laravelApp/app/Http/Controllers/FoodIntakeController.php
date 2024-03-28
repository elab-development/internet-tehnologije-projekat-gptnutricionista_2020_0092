<?php

namespace App\Http\Controllers;

use App\Models\FoodIntake;
use Illuminate\Http\Request;
use App\Http\Resources\FoodIntakeResource;
use Illuminate\Support\Facades\Validator;

class FoodIntakeController extends Controller
{
    public function index()
    {
        return FoodIntakeResource::collection(FoodIntake::all());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'meal_type' => 'required|string|max:255',
            'calories' => 'required|integer',
            'description' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i:s',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $foodIntake = FoodIntake::create($validator->validated());

        return new FoodIntakeResource($foodIntake);
    }

    public function show($id)
    {
        $foodIntake = FoodIntake::findOrFail($id);

        return new FoodIntakeResource($foodIntake);
    }

    public function update(Request $request, $id)
    {
        $foodIntake = FoodIntake::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'meal_type' => 'required|string|max:255',
            'calories' => 'required|integer',
            'description' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i:s',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $foodIntake->update($validator->validated());

        return new FoodIntakeResource($foodIntake);
    }

    public function destroy($id)
    {
        $foodIntake = FoodIntake::findOrFail($id);
        $foodIntake->delete();

        return response()->json(null, 204);
    }
}
