<?php

namespace App\Http\Controllers;

use App\Models\PersonalizedTraining;
use Illuminate\Http\Request;
use App\Http\Resources\PersonalizedTrainingResource;
use Illuminate\Support\Facades\Validator;

class PersonalizedTrainingController extends Controller
{
    public function index()
    {
        return PersonalizedTrainingResource::collection(PersonalizedTraining::all());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'training_type' => 'required|in:Strength,Aerobics,Circuit,Balance,Cardio,Anaerobic,Stretching',
            'duration' => 'required|integer',
            'target_muscle_group' => 'required|string|max:255',
            'instructions' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $personalizedTraining = PersonalizedTraining::create($validator->validated());

        return new PersonalizedTrainingResource($personalizedTraining);
    }

    public function show($id)
    {
        $personalizedTraining = PersonalizedTraining::findOrFail($id);

        return new PersonalizedTrainingResource($personalizedTraining);
    }

    public function update(Request $request, $id)
    {
        $personalizedTraining = PersonalizedTraining::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'training_type' => 'required|in:Strength,Aerobics,Circuit,Balance,Cardio,Anaerobic,Stretching',
            'duration' => 'required|integer',
            'target_muscle_group' => 'required|string|max:255',
            'instructions' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $personalizedTraining->update($validator->validated());

        return new PersonalizedTrainingResource($personalizedTraining);
    }

    public function destroy($id)
    {
        $personalizedTraining = PersonalizedTraining::findOrFail($id);
        $personalizedTraining->delete();

        return response()->json(null, 204);
    }
}
