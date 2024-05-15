<?php

namespace App\Http\Controllers;

use App\Models\FoodIntake;
use Illuminate\Http\Request;
use App\Http\Resources\FoodIntakeResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class FoodIntakeController extends Controller
{
    public function index(Request $request)
    {
        // Dobijanje trenutnog ulogovanog korisnika
        $user = Auth::user(); //prepravljeno za react domaci
    
        // Definisanje filtera
        $query = FoodIntake::query();
        
        // Filtriranje po user_id (umesto iz requesta, koristimo ID ulogovanog korisnika)
        $query->where('user_id', $user->id);
        
        // Filtriranje po meal_type
        if ($request->has('meal_type')) {
            $query->where('meal_type', 'like', '%' . $request->input('meal_type') . '%');
        }
        
        // Filtriranje po datumu
        if ($request->has('date')) {
            $query->whereDate('date', $request->input('date'));
        }
        
        // Dodavanje paginacije na upit
        $foodIntakes = $query->paginate(5);  
        
        return FoodIntakeResource::collection($foodIntakes);
    }
    
    

    public function store(Request $request)
    {
        $user = Auth::user(); // Dobijanje trenutno ulogovanog korisnika
    
        $validator = Validator::make($request->all(), [
            'meal_type' => 'required|string|max:255',
            'calories' => 'required|integer',
            'description' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        $foodIntakeData = $validator->validated();
        $foodIntakeData['user_id'] = $user->id; // Dodavanje user_id iz trenutno ulogovanog korisnika
    
        $foodIntake = FoodIntake::create($foodIntakeData);
    
        return new FoodIntakeResource($foodIntake);
    }
    

    public function show($id)
    {
        $foodIntake = FoodIntake::findOrFail($id);

        return new FoodIntakeResource($foodIntake);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user(); // Dobijanje trenutno ulogovanog korisnika
        $foodIntake = FoodIntake::findOrFail($id);
    
        $validator = Validator::make($request->all(), [
            'meal_type' => 'required|string|max:255',
            'calories' => 'required|integer',
            'description' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i:s',
        ]); 
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        } 
        $validatedData = $validator->validated();
        $validatedData['user_id'] = $user->id; // Dodavanje user_id iz trenutno ulogovanog korisnika
    
        $foodIntake->update($validatedData);
    
        return new FoodIntakeResource($foodIntake);
    }
    

    public function destroy($id)
    {
        $foodIntake = FoodIntake::findOrFail($id);
        $foodIntake->delete();

        return response()->json(null, 204);
    }
}
