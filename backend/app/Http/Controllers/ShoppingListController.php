<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\ShoppingList;
use Illuminate\Http\Request;

class ShoppingListController extends Controller
{
    // List all items for authenticated user
    public function index()
    {
        $items = ShoppingList::with('ingredient')
                    ->where('user_id', auth()->id())
                    ->get();

        return response()->json($items);
    }

    // Add to shopping list if not, remove from the list if yes
    public function toggle(Request $request)
    {
        $request->validate([
            'ingredient_id' => 'required|exists:ingredients,id',
        ]);

        $userId = auth()->id();
        $ingredientId = $request->ingredient_id;

        $item = ShoppingList::where('user_id', $userId)
                            ->where('ingredient_id', $ingredientId)
                            ->first();

        if ($item) {
            $item->delete();

            return response()->json([
                'message' => 'Ingredient removed from shopping list.',
                'status' => 'removed',
            ]);
        }

        $newItem = ShoppingList::create([
            'user_id' => $userId,
            'ingredient_id' => $ingredientId,
        ]);

        return response()->json([
            'message' => 'Ingredient added to shopping list.',
            'status' => 'added',
            'data' => $newItem,
        ], 201);
    }

    // Add everything in the recipe that's not aleady added to the shopping list
    public function bulkAddFromRecipe($recipeId)
    {
        $userId = auth()->id();

        // Fetch the recipe with its ingredients
        $recipe = Recipe::with('ingredients')->findOrFail($recipeId);

        $ingredientIds = $recipe->ingredients->pluck('id')->toArray();

        // Get existing shopping list entries to avoid duplicates
        $existing = ShoppingList::where('user_id', $userId)
            ->whereIn('ingredient_id', $ingredientIds)
            ->pluck('ingredient_id')
            ->toArray();

        $toInsert = array_diff($ingredientIds, $existing);

        $newItems = [];

        foreach ($toInsert as $ingredientId) {
            $newItems[] = [
                'user_id' => $userId,
                'ingredient_id' => $ingredientId,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        ShoppingList::insert($newItems);

        return response()->json([
            'message' => count($newItems) . ' ingredient(s) added from recipe.',
            'added_ids' => $toInsert,
        ]);
    }

    public function clearAll()
    {
        $userId = auth()->id();

        ShoppingList::where('user_id', $userId)->delete();

        return response()->json(['message' => 'All shopping list items cleared.']);
    }


    // Add an item
    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'ingredient_id' => 'required|exists:ingredients,id',
    //     ]);

    //     $item = ShoppingList::create([
    //         'user_id' => auth()->id(),
    //         'ingredient_id' => $request->ingredient_id,
    //     ]);

    //     return response()->json($item, 201);
    // }

    // Delete an item
    // public function destroy($id)
    // {
    //     $item = ShoppingList::where('id', $id)
    //                         ->where('user_id', auth()->id())
    //                         ->first();

    //     if (!$item) {
    //         return response()->json(['message' => 'Item not found'], 404);
    //     }

    //     $item->delete();

    //     return response()->json(['message' => 'Item removed']);
    // }
}
