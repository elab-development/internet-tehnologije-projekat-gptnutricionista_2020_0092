<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'age' => 'nullable|integer|min:1',
            'gender' => 'nullable|string|max:10',
            'height' => 'nullable|integer|min:1',
            'weight' => 'nullable|integer|min:1',
            'goal_weight' => 'nullable|integer|min:1',
            'dietary_preferences' => 'nullable|string|max:255',
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'age' => $validatedData['age'] ?? null,
            'gender' => $validatedData['gender'] ?? null,
            'height' => $validatedData['height'] ?? null,
            'weight' => $validatedData['weight'] ?? null,
            'goal_weight' => $validatedData['goal_weight'] ?? null,
            'dietary_preferences' => $validatedData['dietary_preferences'] ?? null,
        ]);

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'user' => new UserResource($user),
            'token' => $token,
        ]);
    }

    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($validatedData)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $user = Auth::user();
        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'user' => new UserResource($user),
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    { 
        $request->user()->currentAccessToken()->delete(); 
        return response()->json(['message' => 'Successfully logged out']);
    }
    public function admin() //metoda na osnovu koje ce admin moci da vidi statistike 
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorizeddd'], 403);
        }
        // Ukupan broj korisnika
        $totalUsers = User::count();

        // Ukupan broj novih korisnika u poslednjih 30 dana
        $newUsersLast30Days = User::where('created_at', '>=', Carbon::now()->subDays(30))->count();

        // Ukupan broj novih korisnika u poslednjih 7 dana
        $newUsersLast7Days = User::where('created_at', '>=', Carbon::now()->subDays(7))->count();

        // Ukupan broj novih korisnika po mesecima
        $monthlyNewUsers = User::selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, COUNT(*) as count')
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->get();

        return response()->json([
            'total_users' => $totalUsers,
            'new_users_last_30_days' => $newUsersLast30Days,
            'new_users_last_7_days' => $newUsersLast7Days,
            'monthly_new_users' => $monthlyNewUsers,
        ]);
    }
}
