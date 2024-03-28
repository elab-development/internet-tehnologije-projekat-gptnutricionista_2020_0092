<?php

use App\Http\Controllers\FoodIntakeController;
use App\Http\Controllers\PersonalizedTrainingController;
use App\Http\Controllers\WaterIntakeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::apiResource('foodIntakes', FoodIntakeController::class);
Route::apiResource('personalizedTrainings', PersonalizedTrainingController::class);
Route::apiResource('waterIntakes', WaterIntakeController::class);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
