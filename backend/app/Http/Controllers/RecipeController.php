<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecipeController extends Controller
{
    // Get all public recipes
    public function index()
    {
        $recipes = Recipe::where('is_public', true)->get(); // only show public recipes
        return response()->json($recipes);
    }

    // Get recipes created by a specific user
        public function userRecipes(User $user)
    {
        $recipes = $user->recipes()->with('ingredients')->get();

        return response()->json($recipes);
    }

    // Get a single recipe
    public function show($id)
    {
        $recipe = Recipe::with('ingredients')->find($id);

        // Optionally restrict access if recipe is not public and not owned by user
        // if (!$recipe->is_public && $recipe->user_id !== Auth::id()) {
        //     return response()->json(['message' => 'Unauthorized'], 403);
        // }

        if (!$recipe) {
            return response()->json([
                'message' => 'Recipe not found',
                'id' => $id
            ], 404);
        }

        // Include id, name, and amount from pivot
        $ingredients = $recipe->ingredients->map(function ($ingredient) {
            return [
                'id' => $ingredient->id,
                'name' => $ingredient->name,
                'amount' => $ingredient->pivot->amount,
            ];
        });

        $data = $recipe->toArray();
        $data['ingredients'] = $ingredients;

        return response()->json($data);
    }

    // Create a new recipe
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'instructions' => 'required|string',
            'description' => 'nullable|string',
            'prep_time_minutes' => 'nullable|integer',
            'cook_time_minutes' => 'nullable|integer',
            'servings' => 'nullable|integer',
            'image_url' => 'nullable|string',
            'is_public' => 'nullable|boolean',
            'ingredients' => 'required|array|min:1',
            'ingredients.*.id' => 'required|exists:ingredients,id',
            'ingredients.*.amount' => 'required|string|max:100',
        ]);

        $recipeData = $request->only([
            'title', 'instructions', 'description', 
            'prep_time_minutes', 'cook_time_minutes', 
            'servings', 'image_url', 'is_public'
        ]);

        $recipe = Auth::user()->recipes()->create($recipeData);

        foreach ($request->ingredients as $ingredientInput) {
            $recipe->ingredients()->attach($ingredientInput['id'], [
                'amount' => $ingredientInput['amount']
            ]);
        }

        $recipe->load('ingredients');

        return response()->json($recipe, 201);
    }


    // Update a recipe
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'instructions' => 'sometimes|required|string',
            'description' => 'nullable|string',
            'prep_time_minutes' => 'nullable|integer',
            'cook_time_minutes' => 'nullable|integer',
            'servings' => 'nullable|integer',
            'image_url' => 'nullable|string',
            'is_public' => 'nullable|boolean',
            'ingredients' => 'sometimes|required|array|min:1',
            'ingredients.*.id' => 'required|exists:ingredients,id',
            'ingredients.*.amount' => 'required|string|max:100',
        ]);

        $recipe = Auth::user()->recipes()->findOrFail($id);

        // Update recipe fields
        $recipe->update($request->only([
            'title', 'instructions', 'description',
            'prep_time_minutes', 'cook_time_minutes',
            'servings', 'image_url', 'is_public'
        ]));

        // If ingredients are provided, sync them
        if ($request->has('ingredients')) {
            $ingredientData = [];
            foreach ($request->ingredients as $ingredient) {
                $ingredientData[$ingredient['id']] = ['amount' => $ingredient['amount']];
            }

            // Sync ingredients (detach all and attach the new ones with amount)
            $recipe->ingredients()->sync($ingredientData);
        }

        $recipe->load('ingredients');

        return response()->json($recipe);
    }


    // Delete a recipe
    public function destroy($id)
    {
        $recipe = Recipe::findOrFail($id);

        if ($recipe->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $recipe->delete();

        return response()->json(['message' => 'Recipe deleted']);
    }
}
