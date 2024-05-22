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


// Rute za autentifikaciju koje nisu zaštićene
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Zaštićene rute
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/napraviPlan', [PlanIshraneController::class, 'generateDietPlan']); 

    Route::apiResources([
        'foodIntakes' => FoodIntakeController::class,
        'personalizedTrainings' => PersonalizedTrainingController::class,
        'waterIntakes' => WaterIntakeController::class,
    ]);


    Route::get('admin', [AuthController::class, 'admin'])->middleware('auth:sanctum');
});