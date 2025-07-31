<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\ShoppingListController;
use App\Http\Controllers\MealPlanController;
use Illuminate\Support\Facades\Auth;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/recipes', [RecipeController::class, 'index']);
Route::get('/recipes/{id}', [RecipeController::class, 'show']);
Route::get('/ingredients', [IngredientController::class, 'index']);
Route::get('/ingredients/{id}', [IngredientController::class, 'show']);

// Protected routes (need token)
Route::middleware('auth:sanctum')->group(function () {
    // Get all User
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // User Logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // Recipes created by a specific user
    Route::get('/users/{user}/recipes', [RecipeController::class, 'userRecipes']);

    // Recipe with index and show excluded
    Route::apiResource('/recipes', RecipeController::class)->except(['index', 'show']);
    
    // Ingredients with index and show excluded
    Route::apiResource('/ingredients', IngredientController::class)->except(['index', 'show']);

    // Favorites
    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::post('/favorites/toggle', [FavoriteController::class, 'toggle']);

    // Shopping List
    Route::get('/shopping-list', [ShoppingListController::class, 'index']);
    Route::post('/shopping-list/toggle', [ShoppingListController::class, 'toggle']);
    Route::post('/shopping-list/from-recipe/{recipeId}', [ShoppingListController::class, 'bulkAddFromRecipe']);
    Route::delete('/shopping-list/clear', [ShoppingListController::class, 'clearAll']);

    // Meal Plans
    Route::delete('/meal-plans/clear', [MealPlanController::class, 'clearAll']);
    Route::get('/meal-plans/day/{day}', [MealPlanController::class, 'byDay']);
    Route::apiResource('meal-plans', MealPlanController::class);


});