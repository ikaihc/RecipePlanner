<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    //
        public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()->json(['message' => 'User registered.'], 201);
    }

    public function login(Request $request)
{
    $request->validate([
        'email' => ['required', 'string', 'email'],
        'password' => ['required', 'string']
    ]);

    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json(['message' => 'Invalidate credentials.'], 401);
    }

    $user = User::where('email', $request->email)->first();
    $token = $user->createToken("api-token-{$user->email}")->plainTextToken;
 
    return response()->json(['message' => 'Authenticated.', 'token' => $token]);
}

public function logout(Request $request)
{
    if ($request->user()) {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'You\'ve logged out successfully.']);
    }

    return response()->json(['message' => 'No user authenticated.'], 401);
}



}
