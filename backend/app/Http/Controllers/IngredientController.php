<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
    // Get all public ingredients
    public function index()
    {
        $ingredients = Ingredient::all();

        return response()->json($ingredients);
    }

    // Get a single ingredient by ID with custom not-found response
    public function show($id)
    {
        $ingredient = Ingredient::find($id);

        if (! $ingredient) {
            return response()->json([
                'message' => 'Ingredient not found',
                'id' => $id,
            ], 404);
        }

        return response()->json($ingredient);
    }


    // Create an ingredient
    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'name' => 'required|string|unique:ingredients,name',
        ]);

        // Create a new ingredient with the validated name
        $ingredient = Ingredient::create([
            'name' => $request->name,
        ]);

        // Return the created ingredient with 201 status code
        return response()->json($ingredient, 201);
    }

    // Update an existing ingredient
    public function update(Request $request, $id)
    {
        // Find the ingredient by ID
        $ingredient = Ingredient::find($id);

        if (! $ingredient) {
            return response()->json([
                'message' => 'Ingredient not found',
                'id' => $id,
            ], 404);
        }

        // Validate the incoming request data
        $request->validate([
            'name' => 'required|string|unique:ingredients,name,' . $id,
        ]);

        // Update the ingredient's name
        $ingredient->name = $request->name;
        $ingredient->save();

        // Return the updated ingredient
        return response()->json($ingredient);
    }

    // Delete an ingredient by ID
    public function destroy($id)
    {
        $ingredient = Ingredient::find($id);

        if (! $ingredient) {
            return response()->json([
                'message' => 'Ingredient not found',
                'id' => $id,
            ], 404);
        }

        $ingredient->delete();

        return response()->json([
            'message' => 'Ingredient deleted successfully',
            'id' => $id,
        ]);
    }





}
