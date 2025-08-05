<?php

namespace App\Http\Controllers;

use App\Models\MealPlan;
use App\Models\Recipe;
use Illuminate\Http\Request;

class MealPlanController extends Controller
{
    // Get all meal plans for the authenticated user
    public function index()
    {
        $mealPlans = MealPlan::with(['recipe:id,title']) // Only select title
            ->where('user_id', auth()->id())
            ->get();

        return response()->json($mealPlans);
    }


    // Get one meal plan
    public function show($id)
    {
        $mealPlan = MealPlan::with(['recipe:id,title'])
            ->where('id', $id)
            ->where('user_id', auth()->id())
            ->first();

        if (! $mealPlan) {
            return response()->json(['message' => 'Meal plan not found or you do not have permission to view it.'], 404);
        }

        return response()->json($mealPlan);
    }


    // Store a new meal plan
    public function store(Request $request)
    {
        $request->validate([
            'day_of_week' => 'required|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday',
            'meal_type' => 'required|in:breakfast,lunch,dinner',
            'recipe_id' => 'required|exists:recipes,id',
        ]);

        // Check if the same recipe is already added for that day and meal
        $exists = MealPlan::where('user_id', auth()->id())
            ->where('day_of_week', $request->day_of_week)
            ->where('meal_type', $request->meal_type)
            ->where('recipe_id', $request->recipe_id)
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'This recipe is already added for that day and meal.'], 409);
        }

        $mealPlan = MealPlan::create([
            'user_id' => auth()->id(),
            'day_of_week' => $request->day_of_week,
            'meal_type' => $request->meal_type,
            'recipe_id' => $request->recipe_id,
        ]);

        // Load the recipe relationship before returning
        $mealPlan->load('recipe:id,title');

        return response()->json($mealPlan, 201);
    }

    // Update a meal plan
    public function update(Request $request, $id)
    {
        $request->validate([
            'day_of_week' => 'required|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday',
            'meal_type' => 'required|in:breakfast,lunch,dinner',
            'recipe_id' => 'required|exists:recipes,id',
        ]);

        $mealPlan = MealPlan::where('id', $id)
            ->where('user_id', auth()->id())
            ->first();

        if (! $mealPlan) {
            return response()->json(['message' => 'Meal plan not found or you do not have permission to update it.'], 404);
        }

        // Normalize values before update
        $day = ucfirst(strtolower($request->day_of_week));
        $meal = strtolower($request->meal_type);

        $mealPlan->update([
            'day_of_week' => $day,
            'meal_type' => $meal,
            'recipe_id' => $request->recipe_id,
        ]);

        return response()->json($mealPlan);
    }

    // Delete a specific meal plan
    public function destroy($id)
    {
        $mealPlan = MealPlan::where('id', $id)
            ->where('user_id', auth()->id())
            ->first();

        if (! $mealPlan) {
            return response()->json(['message' => 'Meal plan not found or you do not have permission to delete it.'], 404);
        }

        $mealPlan->delete();

        return response()->json(['message' => 'Meal plan deleted.']);
    }

    // Clear all meal plans for current user
    public function clearAll()
    {
        MealPlan::where('user_id', auth()->id())->delete();

        return response()->json(['message' => 'All meal plans cleared.']);
    }

    // Get all meals for a specific day
    public function byDay($day)
    {
        $validDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

        if (! in_array($day, $validDays)) {
            return response()->json(['message' => 'Invalid day'], 400);
        }

        $plans = MealPlan::with(['recipe:id,title'])
            ->where('user_id', auth()->id())
            ->where('day_of_week', $day)
            ->get();

        return response()->json($plans);
    }
}
