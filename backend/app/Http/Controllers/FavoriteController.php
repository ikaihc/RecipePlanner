<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorite;

class FavoriteController extends Controller
{

    // Get all favorites of a user
    public function index()
    {
        $userId = auth()->id();

        // Get all favorites of the authenticated user with their recipes
        $favorites = Favorite::with('recipe')
            ->where('user_id', $userId)
            ->get();

        // Return only the recipes
        $recipes = $favorites->map(function ($favorite) {
            return $favorite->recipe;
        });

        return response()->json($recipes);
    }

    // Favorite a recipe if not done already, unfavorite it if it's already favored
    public function toggle(Request $request)
    {
        // Validate that recipe_id is present and valid
        $request->validate([
            'recipe_id' => 'required|exists:recipes,id',
        ]);

        $userId = auth()->id();
        $recipeId = $request->recipe_id;

        // Check if favorite exists
        $favorite = Favorite::where('user_id', $userId)
                            ->where('recipe_id', $recipeId)
                            ->first();

        if ($favorite) {
            // Delete favorite (unfavorite)
            $favorite->delete();

            return response()->json([
                'message' => 'Recipe unfavorited successfully.',
                'status' => 'removed',
            ]);
        }

        // Create favorite
        $newFavorite = Favorite::create([
            'user_id' => $userId,
            'recipe_id' => $recipeId,
        ]);

        return response()->json([
            'message' => 'Recipe favorited successfully.',
            'status' => 'added',
            'data' => $newFavorite,
        ], 201);
    }


    // // Create a Favorite  
    // public function store(Request $request)
    // {
    //     // Validate only the recipe_id
    //     $request->validate([
    //         'recipe_id' => 'required|exists:recipes,id',
    //     ]);

    //     $userId = auth()->id();
    //     $recipeId = $request->recipe_id;

    //     // Check if favorite already exists
    //     $exists = Favorite::where('user_id', $userId)
    //                     ->where('recipe_id', $recipeId)
    //                     ->exists();

    //     if ($exists) {
    //         return response()->json([
    //             'message' => 'Recipe already favorited'
    //         ], 409);
    //     }

    //     // Create favorite
    //     $favorite = Favorite::create([
    //         'user_id' => $userId,
    //         'recipe_id' => $recipeId,
    //     ]);

    //     return response()->json($favorite, 201);
    // }

    // public function destroy(Request $request)
    // {
    //     $request->validate([
    //         'recipe_id' => 'required|exists:recipes,id',
    //     ]);

    //     $userId = auth()->id();
    //     $recipeId = $request->recipe_id;

    //     // Find the favorite record
    //     $favorite = Favorite::where('user_id', $userId)
    //                         ->where('recipe_id', $recipeId)
    //                         ->first();

    //     if (!$favorite) {
    //         return response()->json([
    //             'message' => 'Favorite not found for this user and recipe.'
    //         ], 404);
    //     }

    //     $favorite->delete();

    //     return response()->json([
    //         'message' => 'Favorite removed successfully.'
    //     ]);
    // }


}
