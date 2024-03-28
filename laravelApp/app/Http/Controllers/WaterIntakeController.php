<?php

namespace App\Http\Controllers;

use App\Models\WaterIntake;
use Illuminate\Http\Request;
use App\Http\Resources\WaterIntakeResource;
use Illuminate\Support\Facades\Validator;

class WaterIntakeController extends Controller
{
    public function index()
    {
        return WaterIntakeResource::collection(WaterIntake::all());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'amount' => 'required|integer|between:200,3000',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i:s',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $waterIntake = WaterIntake::create($validator->validated());

        return new WaterIntakeResource($waterIntake);
    }

    public function show($id)
    {
        $waterIntake = WaterIntake::findOrFail($id);

        return new WaterIntakeResource($waterIntake);
    }

    public function update(Request $request, $id)
    {
        $waterIntake = WaterIntake::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'amount' => 'required|integer|between:200,3000',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i:s',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $waterIntake->update($validator->validated());

        return new WaterIntakeResource($waterIntake);
    }

    public function destroy($id)
    {
        $waterIntake = WaterIntake::findOrFail($id);
        $waterIntake->delete();

        return response()->json(null, 204);
    }
}
