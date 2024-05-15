<?php
namespace App\Http\Controllers;

use App\Models\WaterIntake;
use Illuminate\Http\Request;
use App\Http\Resources\WaterIntakeResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class WaterIntakeController extends Controller
{
    public function index()
    {
        $user = Auth::user(); // Dobijanje trenutno ulogovanog korisnika
        $waterIntakes = WaterIntake::where('user_id', $user->id)->get();
        return WaterIntakeResource::collection($waterIntakes);
    }

    public function store(Request $request)
    {
        $user = Auth::user(); // Dobijanje trenutno ulogovanog korisnika

        $validator = Validator::make($request->all(), [
            'amount' => 'required|integer|between:200,3000',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i:s',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $validatedData = $validator->validated();
        $validatedData['user_id'] = $user->id; // Dodavanje user_id iz trenutno ulogovanog korisnika

        $waterIntake = WaterIntake::create($validatedData);

        return new WaterIntakeResource($waterIntake);
    }

    public function show($id)
    {
        $waterIntake = WaterIntake::findOrFail($id);

        return new WaterIntakeResource($waterIntake);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user(); // Dobijanje trenutno ulogovanog korisnika
        $waterIntake = WaterIntake::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'amount' => 'required|integer|between:200,3000',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i:s',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $validatedData = $validator->validated();
        $validatedData['user_id'] = $user->id; // Dodavanje user_id iz trenutno ulogovanog korisnika

        $waterIntake->update($validatedData);

        return new WaterIntakeResource($waterIntake);
    }

    public function destroy($id)
    {
        $waterIntake = WaterIntake::findOrFail($id);
        $waterIntake->delete();

        return response()->json(null, 204);
    }
}
