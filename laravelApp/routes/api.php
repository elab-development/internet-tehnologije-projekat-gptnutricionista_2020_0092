<?php

use App\Http\Controllers\FoodIntakeController;
use App\Http\Controllers\PersonalizedTrainingController;
use App\Http\Controllers\WaterIntakeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PlanIshraneController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// Ruta za generisanje plana ishrane
Route::post('/napraviPlan', [PlanIshraneController::class, 'generateDietPlan']); 
Route::post('/register', [AuthController::class, 'register']); 
Route::post('/login', [AuthController::class, 'login']); 
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) { //vraca podatke o ulogovanom korisniku
    return $request->user();
}); 
Route::apiResource('foodIntakes', FoodIntakeController::class);
Route::apiResource('personalizedTrainings', PersonalizedTrainingController::class);
Route::apiResource('waterIntakes', WaterIntakeController::class);
